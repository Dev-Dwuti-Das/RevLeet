import mongoose from 'mongoose';
const url = process.env.MONGO_KEY;

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_KEY, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

export const sample_user_data = [{
    "name": "devdas",
    "email": "devdas@example.com",
    "profile": {
      "fullName": "Dev D. Das",
      "avatarUrl": "https://example.com/avatars/devdas.png",
      "bio": "Founder of Sprucial, passionate about AI and coding humor reels."
    },
    "totalSolved": 120,
    "streak": 12,
    "lastActive": "2025-10-21T18:45:00.000Z"
  }]

export const mockQuestions = [
  {
    name: "Two Sum - LeetCode #1",
    note: "used hashmap to store complement values",
    difficulty: 2, // did_it_with_Little_help
    reviewdate: new Date("2025-10-20T10:30:00Z"),
    repetitions: 3,
    interval: 2,
    isMastered: false
  },
  {
    name: "Binary Search - Basics",
    note: "clean code, understood recursion clearly",
    difficulty: 4, // smooth_af
    reviewdate: new Date("2025-10-21T14:15:00Z"),
    repetitions: 5,
    interval: 4,
    isMastered: false
  }];