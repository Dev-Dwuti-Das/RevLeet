import mongoose from 'mongoose';
const { Schema } = mongoose;



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
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },

  password:{
    type:String,
    required: true,
    trim: true,
    unique: true,
  },

  profile: {
    fullName: String,
  },


  totalSolved: { type: Number, default: 0 },

  queueCounts: { type: queueCountSchema, default: () => ({}) },

  streak: { type: Number, default: 0 },

});

export default mongoose.model("Account", AccountSchema);
