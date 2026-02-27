import feeGroup from "../models/feeGroup.js";
import FeePayment from "../models/feePayment.js";
import User from "../models/user.js";

// Create multiple fee records (payload: [{ studentId, amount, status, collegeName, batch, programName, technology }])
export const createFeePayments = async (req, res) => {
  try {
    const payload = req.body;
    if (!Array.isArray(payload) || payload.length === 0) return res.status(400).json({ error: "Array payload required" });

    const markedBy = req.user?.id;
    // We'll upsert a single document per student+college+batch+program+technology
    const ops = payload.map(p => {
      const filter = {
        student: p.studentId,
        collegeName: p.collegeName,
        batch: p.batch,
        programName: p.programName,
        technology: p.technology
      };
      const update = {
        $set: {
          amount: p.amount,
          status: p.status || 'Pending',
          markedBy,
        },
        $setOnInsert: {
          createdAt: new Date()
        }
      };
      return {
        updateOne: {
          filter,
          update,
          upsert: true
        }
      };
    });

    const bulk = await FeePayment.bulkWrite(ops);
    // bulkWrite doesn't give exact inserted count uniformly; return summary
    res.json({ matchedCount: bulk.matchedCount || 0, upsertedCount: bulk.upsertedCount || 0, modifiedCount: bulk.modifiedCount || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const listFeePayments = async (req, res) => {
  try {
    console.log("===== listFeePayments From FeeGroup =====");
    console.log("Query Params:", req.query);

    const { collegeName, batch, programName, technology, studentId } =
      req.query;

    const match = {};

    if (collegeName?.trim()) match.collegeName = collegeName.trim();
    if (batch?.trim()) match.batch = batch.trim();
    if (programName?.trim()) match.programName = programName.trim();
    if (technology?.trim()) match.technology = technology.trim();

    console.log("Group Match Filter:", match);

    const pipeline = [
      { $match: match },

      { $unwind: "$students" },

      ...(studentId && mongoose.Types.ObjectId.isValid(studentId)
        ? [
            {
              $match: {
                "students.student": new mongoose.Types.ObjectId(studentId),
              },
            },
          ]
        : []),

      // 🔹 Lookup Student Details
      {
        $lookup: {
          from: "users",
          localField: "students.student",
          foreignField: "_id",
          as: "studentDetails",
        },
      },
      { $unwind: { path: "$studentDetails", preserveNullAndEmptyArrays: true } },

      // 🔹 Lookup Collector (for paymentHistory.by)
      {
        $lookup: {
          from: "users",
          localField: "students.paymentHistory.by",
          foreignField: "_id",
          as: "collectorDetails",
        },
      },

      {
        $project: {
          _id: 0,

          // ✅ Remove sensitive fields from student
          student: {
            _id: "$studentDetails._id",
            name: "$studentDetails.name",
            email: "$studentDetails.email",
            phone: "$studentDetails.phone",
            role: "$studentDetails.role",
          },

          totalFee: "$students.totalFee",
          paidFee: "$students.paidFee",
          currentFee: "$students.currentFee",
          status: "$students.status",

          // ✅ Replace "by" with collector email
          paymentHistory: {
            $map: {
              input: "$students.paymentHistory",
              as: "payment",
              in: {
                amount: "$$payment.amount",
                paidOn: "$$payment.paidOn",
                paymentMode: "$$payment.paymentMode",
                receipt: "$$payment.receipt",
                remark: "$$payment.remark",
                transactionId: "$$payment.transactionId",

                collectedBy: {
                  $let: {
                    vars: {
                      collector: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: "$collectorDetails",
                              as: "col",
                              cond: {
                                $eq: ["$$col._id", "$$payment.by"],
                              },
                            },
                          },
                          0,
                        ],
                      },
                    },
                    in: "$$collector.email",
                  },
                },
              },
            },
          },

          collegeName: 1,
          batch: 1,
          programName: 1,
          technology: 1,
          createdAt: 1,
        },
      },
    ];

    console.log("Aggregation Pipeline:", JSON.stringify(pipeline, null, 2));

    const records = await feeGroup.aggregate(pipeline);

    console.log("Result Count:", records.length);

    res.json(records);
  } catch (err) {
    console.error("Error fetching fee payments:", err);
    res.status(500).json({ error: err.message });
  }
};


// Update fee status (id param) - body: { status: 'Paid' }
export const updateFeeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!id) return res.status(400).json({ error: 'id required' });
    if (!['Pending','Paid'].includes(status)) return res.status(400).json({ error: 'invalid status' });

    const update = { status };
    if (status === 'Paid') update.paidOn = new Date();

    const fp = await FeePayment.findByIdAndUpdate(id, update, { new: true });
    res.json(fp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
