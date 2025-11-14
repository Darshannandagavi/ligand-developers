// controllers/examController.js
import Exam from "../models/exam.js";
import user from "../models/user.js";

// Create a new exam
export async function createExam(req, res) {
  try {
    if (!req.body.examTitle) {
      return res.status(400).json({ error: "Exam title is required" });
    }
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json({ message: "Exam created successfully", exam });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get all exams
export async function getExams(req, res) {
  try {
    const exams = await Exam.find({visibility:"public"});
    res.json(exams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get a single exam by ID
export async function getExamById(req, res) {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ error: "Exam not found" });
    res.json(exam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update an exam
export async function updateExam(req, res) {
  try {
    console.log("welcome to exam update")
    
    if (!req.body.examTitle) {
      return res.status(400).json({ error: "Exam title is required" });
    }
    console.log("i am here",req.params.id,"i am also here",req.body)
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!exam) return res.status(404).json({ error: "Exam not found" });
    res.json({ message: "Exam updated successfully", exam });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete an exam
export async function deleteExam(req, res) {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) return res.status(404).json({ error: "Exam not found" });
    res.json({ message: "Exam deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export async function getExamsforadmin(req, res) {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Toggle showResult flag for an exam (admin)
export async function toggleShowResult(req, res) {
  try {
    const { id } = req.params;
    const { showResult } = req.body; // optional boolean; if omitted we toggle

    const exam = await Exam.findById(id);
    if (!exam) return res.status(404).json({ error: "Exam not found" });

    if (typeof showResult === 'boolean') {
      exam.showResult = showResult;
    } else {
      exam.showResult = !exam.showResult;
    }

    await exam.save();
    res.json({ message: 'Exam showResult updated', exam });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// controllers/examController.js
export async function toggleCollegeAccess(req, res) {
  try {
    const { id } = req.params; // exam id
    const { collegeName } = req.body;

    const exam = await Exam.findById(id);
    if (!exam) return res.status(404).json({ error: "Exam not found" });

    // If exam.collegeName is missing, set it from req.body
    if (!exam.collegeName && collegeName) {
      exam.collegeName = collegeName;
    }

    if (exam.visibleTo.includes(collegeName)) {
      exam.visibleTo = exam.visibleTo.filter(c => c !== collegeName);
    } else {
      exam.visibleTo.push(collegeName);
    }

    await exam.save();
    res.json({ message: "Exam visibility updated", exam });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// export async function getExamsForUser(req, res) {
//   try {
//     const { collegeName } = req.params;
//     const exams = await Exam.find({
//       visibility: "public",
//       visibleTo: collegeName
//     });
//     console.log(exams)
//     res.json(exams);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }


export async function getExamsForUser(req, res) {
  try {
    const { studentId, collegeName } = req.params;

    const student = await user.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Count completed homework
    const completed = student.homeworkStatus.filter(
      (h) => h.status === "done"
    ).length;

    // Weekly exam numbers
    const weeklyExams = [201, 202, 203, 204];

    // Determine which weekly exams are unlocked
    let unlockedWeekly = [];
    if (completed >= 4) unlockedWeekly.push(201);
    if (completed >= 8) unlockedWeekly.push(202);
    if (completed >= 12) unlockedWeekly.push(203);
    if (completed >= 16) unlockedWeekly.push(204);

    // 1. Fetch ALL exams except 201–204  (always visible)
    const regularExams = await Exam.find({
      visibility: "public",
      visibleTo: collegeName,
      examNumber: { $nin: weeklyExams }
    });

    // 2. Fetch ONLY unlocked weekly exams
    const unlockedWeeklyExams = await Exam.find({
      visibility: "public",
      visibleTo: collegeName,
      examNumber: { $in: unlockedWeekly }
    });

    // Final output
    const allExams = [...regularExams, ...unlockedWeeklyExams];

    res.json({
      exams: allExams,
      completedHomework: completed,
      unlockedWeeklyCount: unlockedWeekly.length
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
