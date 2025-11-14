import Homework from "../models/homework.js";

// Add new homework
export const addHomework = async (req, res) => {
  try {
    const { chapterNumber, chapterName, description } = req.body;
    const chapter=await Homework.findOne({chapterNumber});
    if(chapter){
      return res.status(400).json({ message: "Chapter number already exists." });
    }
    if (!chapterNumber || !chapterName || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newHomework = new Homework({
      chapterNumber,
      chapterName,
      description,
    });

    const savedHomework = await newHomework.save();
    res.status(201).json({ message: "Homework added successfully!", data: savedHomework });
  } catch (error) {
    console.error("Error adding homework:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

// Get all homeworks
export const getAllHomeworks = async (req, res) => {
  try {
    const homeworks = await Homework.find().sort({ createdAt: -1 });
    res.status(200).json(homeworks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching homework data." });
  }
};

// Get single homework by ID
export const getHomeworkById = async (req, res) => {
  try {
    const homework = await Homework.findById(req.params.id);
    if (!homework) return res.status(404).json({ message: "Homework not found." });
    res.status(200).json(homework);
  } catch (error) {
    res.status(500).json({ message: "Error fetching homework." });
  }
};

// Update homework
export const updateHomework = async (req, res) => {
  try {
    const updatedHomework = await Homework.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedHomework) return res.status(404).json({ message: "Homework not found." });
    res.status(200).json({ message: "Homework updated successfully!", data: updatedHomework });
  } catch (error) {
    res.status(500).json({ message: "Error updating homework." });
  }
};

// Delete homework
export const deleteHomework = async (req, res) => {
  try {
    const deletedHomework = await Homework.findByIdAndDelete(req.params.id);
    if (!deletedHomework) return res.status(404).json({ message: "Homework not found." });
    res.status(200).json({ message: "Homework deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting homework." });
  }
};
