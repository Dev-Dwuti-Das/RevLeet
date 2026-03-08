import mongoose from "mongoose";

const { Schema } = mongoose;

const ProjectStarSchema = new Schema(
  {
    projectKey: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    count: {
      type: Number,
      default: 0,
      min: 0,
    },
    starredClientIds: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("ProjectStar", ProjectStarSchema);
