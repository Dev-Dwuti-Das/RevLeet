import mongoose from 'mongoose';
const { Schema } = mongoose;

const dailySolvedSchema = new Schema({
  date: { type: String }, // format: YYYY-MM-DD
  solved: { type: Number, default: 0 },
});

const queueCountSchema = new Schema({
  Q1: { type: Number, default: 0 },
  Q2: { type: Number, default: 0 },
  Q3: { type: Number, default: 0 },
  Q4: { type: Number, default: 0 },
  Q5: { type: Number, default: 0 },
});

const AccountSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },

  profile: {
    fullName: String,
    avatarUrl: String,
    bio: String,
  },

  settings: {
    dailyGoal: Number,
  },

  // Global metrics for the dashboard
  totalSolved: { type: Number, default: 0 },

  // queue distribution (Q1..Q5)
  queueCounts: { type: queueCountSchema, default: () => ({}) },

  // For graphs (problems solved per day)
  dailySolved: { type: [dailySolvedSchema], default: [] },

  streak: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now },
});

export default mongoose.model("Account", AccountSchema);
