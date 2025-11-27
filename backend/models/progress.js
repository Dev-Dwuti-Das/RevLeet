import mongoose from "mongoose";
const { Schema } = mongoose;

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import relativeTime from "dayjs/plugin/relativeTime.js";

dayjs.extend(utc);
dayjs.extend(relativeTime);

// Difficulty labels (your original)
const difficultyLevels = {
  0: "Absolute_clueless",
  1: "Vague_idea",
  2: "did_it_with_Little_help",
  3: "almost_did_clean",
  4: "smooth_af"
};

// -------------------- REVIEW HISTORY --------------------
const reviewHistorySchema = new Schema({
  reviewedAt: { type: Date, default: Date.now },
  rating: { type: Number, enum: [0, 1, 2, 3, 4], required: true },
  interval: { type: Number },
  easeFactor: { type: Number },
});

// -------------------- PROGRESS SCHEMA --------------------
const progressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },

    // QUESTION INFO (your previous Question schema merged)
    name: { type: String, required: true, trim: true },
    note: { type: String, lowercase: true, trim: true },

    difficulty: {
      type: Number,
      enum: [0, 1, 2, 3, 4],
      required: true,
    },

    reviewdate: { type: Date, default: Date.now },

    // SM-2 core
    repetitions: { type: Number, default: 0 },
    interval: { type: Number, default: 1 },
    easeFactor: { type: Number, default: 2.5 },
    nextReviewDate: { type: Date, default: Date.now },

    // Status for graphs
    status: {
      type: String,
      enum: ["Learning", "Reviewing", "Mastered"],
      default: "Learning",
    },

    // Spaced repetition history (for analytics)
    reviewHistory: [reviewHistorySchema],
  },
  { timestamps: true }
);

// Prevent duplicate question name per user
progressSchema.index({ user: 1, name: 1 }, { unique: true });

// -------------------- VIRTUAL: lastReviewedAgo --------------------
progressSchema.virtual("lastReviewedAgo").get(function () {
  if (!this.reviewdate) return null;
  const lastReviewedUTC = dayjs.utc(this.reviewdate);
  return lastReviewedUTC.from(dayjs.utc());
});

// Enable virtuals in JSON
progressSchema.set("toJSON", { virtuals: true });
progressSchema.set("toObject", { virtuals: true });

export default mongoose.model("Progress", progressSchema);
