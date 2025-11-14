import Homework from "../models/homework.js";
import user from "../models/user.js";


// POST /api/homeworkstatus
export const updateHomeworkStatus = async (req, res) => {
  try {
    const { homeworkId, records, markedBy } = req.body;

    if (!homeworkId || !records || !records.length)
      return res.status(400).json({ message: "Invalid request data." });

    const hw = await Homework.findById(homeworkId);
    if (!hw) return res.status(404).json({ message: "Homework not found." });

    let updatedCount = 0;

    for (const record of records) {
      const { studentId, status } = record;

      const student = await user.findById(studentId);
      if (!student) continue;

      // Check if homework already exists in the array
      const existing = student.homeworkStatus.find(
        (h) => h.homeworkId.toString() === homeworkId.toString()
      );

      if (existing) {
        existing.status = status;
        existing.markedAt = new Date();
        existing.markedBy = markedBy;
      } else {
        student.homeworkStatus.push({
          homeworkId,
          status,
          markedBy,
          markedAt: new Date(),
        });
      }

      await student.save();
      updatedCount++;
    }

    res.status(200).json({
      message: `Homework status updated for ${updatedCount} students.`,
      updatedCount,
    });
  } catch (err) {
    console.error("Error updating homework status:", err);
    res.status(500).json({ message: "Server error while updating homework status." });
  }
};

// GET /api/homeworkstatus/:studentId
export const getStudentHomeworkStatus = async (req, res) => {
  try {
    const student = await user.findById(req.params.studentId)
      .populate("homeworkStatus.homeworkId", "chapterNumber chapterName")
      .populate("homeworkStatus.markedBy", "name email");

    if (!student) return res.status(404).json({ message: "Student not found." });

    res.status(200).json(student.homeworkStatus);
  } catch (err) {
    console.error("Error fetching homework status:", err);
    res.status(500).json({ message: "Server error while fetching homework status." });
  }
};

// export const getUnlockedExams = async (studentId) => {
//   // Step 1: Find ALL homeworks marked "done" for this student
//   const completedHomeworks = await HomeworkStatus.find({
//     student: studentId,
//     status: "done"              // ← Only count "done" ones
//   });

//   const completedCount = completedHomeworks.length;
//   // completedCount = 5, 10, 15, or 20?

//   // Step 2: Unlock exams based on count
//   const unlockedExams = [];

//   if (completedCount >= 5)  unlockedExams.push("Week 1");   // 5+ homeworks
//   if (completedCount >= 10) unlockedExams.push("Week 2");   // 10+ homeworks
//   if (completedCount >= 15) unlockedExams.push("Week 3");   // 15+ homeworks
//   if (completedCount >= 20) unlockedExams.push("Week 4");   // 20+ homeworks

//   // Step 3: Return result
//   return {
//     completedHomeworks: 5,           // "You completed 5 homeworks"
//     unlockedExams: ["Week 1"]        // "Week 1 Exam is available"
//   };
// };
