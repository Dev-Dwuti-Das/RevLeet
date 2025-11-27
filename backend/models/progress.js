import mongoose from "mongoose";

const reviewHistorySchema = new mongoose.Schema({
  reviewedAt: { type: Date, default: Date.now },
  rating: { type: Number, enum: [0, 1, 2, 3, 4], required: true }, // 0=forgot, 4=easy
  interval: { type: Number },        // days assigned after this review
  easeFactor: { type: Number },      // how easy it felt (SM-2 EF)
});

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },

    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LeetCodeQuestion",
      required: true,
    },

    // SM-2 required fields
    repetitions: { type: Number, default: 0 }, // how many times reviewed
    interval: { type: Number, default: 1 },    // next interval (days)
    easeFactor: { type: Number, default: 2.5 }, // EF starts at 2.5
    nextReviewDate: { type: Date, default: Date.now }, // upcoming review

    // For graphs
    status: {
      type: String,
      enum: ["Learning", "Reviewing", "Mastered"],
      default: "Learning",
    },

    // History for chart plotting
    reviewHistory: [reviewHistorySchema],
  },
  { timestamps: true }
);

// Prevent multiple progress records for same user+question
progressSchema.index({ user: 1, question: 1 }, { unique: true });

export default mongoose.model("Progress", progressSchema);
