import mongoose from "mongoose";
const { Schema } = mongoose;

const QUEUES = ["Q1", "Q2", "Q3", "Q4", "Q5"];

const ProgressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },

  question: {
    type: Schema.Types.ObjectId,
    ref: "LeetCodeQuestion",
    required: true,
  },

 
  queue: {
    type: String,
    enum: QUEUES,
    default: "Q1",  
  },

  queueEnteredAt: {
    type: Date,
    default: Date.now,
  },

  autoMoveAt: {
    type: Date,
    default: null,
  },

});

// guarantee one per user per question
ProgressSchema.index({ user: 1, question: 1 }, { unique: true });

export default mongoose.model("Progress", ProgressSchema);
