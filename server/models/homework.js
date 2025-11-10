import mongoose from "mongoose";

const homeworkSchema = new mongoose.Schema(
  {
    chapterNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    chapterName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt fields automatically
);

const Homework = mongoose.model("Homework", homeworkSchema);

export default Homework;
