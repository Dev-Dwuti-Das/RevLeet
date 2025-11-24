import mongoose from 'mongoose';
import questions from './questions.js';
const { Schema } = mongoose;

const Account_schema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        trim : true,
        unique : true,
    },
    email:{
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowercase : true,
    },
    profile: {
      fullName: String,
      avatarUrl: String,
      bio: String,
    },
    totalSolved: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now }, 
})

export default mongoose.model("Account" , Account_schema);

