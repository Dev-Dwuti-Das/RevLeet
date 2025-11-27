import mongoose from "mongoose";

const leetCodeQuestionSchema = new mongoose.Schema({
  questionNumber: {
    type: Number,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  slug: {
    type: String, // ex: "two-sum"
    required: true,
    unique: true,
  },

  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },

  topicTags: [
    {
      type: String, // ex: "Array", "DP", "Graph"
    },
  ],

  link: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["Unsolved", "Attempted", "Solved", "Reviewed"],
    default: "Unsolved",
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
});

export default mongoose.model("LeetCodeQuestion", leetCodeQuestionSchema);
