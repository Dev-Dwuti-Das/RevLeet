// import mongoose from 'mongoose';
// const { Schema } = mongoose;
// import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc.js";
// import relativeTime from "dayjs/plugin/relativeTime.js";

// dayjs.extend(utc);
// dayjs.extend(relativeTime);

// const difficultyLevels = {
//   0: "Absolute_clueless",
//   1: "Vague_idea",
//   2: "did_it_with_Little_help",
//   3: "almost_did_clean",
//   4: "smooth_af"
// };

// const questionSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true},
//   note: { type: String, lowercase: true, trim: true},
//   difficulty: { type: Number,
//      enum: [0, 1, 2, 3, 4], required: true 
//     },
//   reviewdate: { type: Date, default: Date.now },
//   repetitions: { type: Number, default: 0 },
//   interval: { type: Number, default: 1 },
//   isMastered: { type: Boolean, default: false },  //delete karva do
// });

// questionSchema.virtual("lastReviewedAgo").get(function () {
//   if (!this.reviewdate) return null;
//   const lastReviewedUTC = dayjs.utc(this.reviewdate); 
//   return lastReviewedUTC.from(dayjs.utc()); 
// });

// questionSchema.set("toJSON", { virtuals: true });
// questionSchema.set("toObject", { virtuals: true }); // yeah virtual ko Json mein bhejta h werna virtual automatically nhi jata

// export default mongoose.model('Question', questionSchema);