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
<<<<<<< HEAD
    // totalSolved: { type: Number, default: 0 },
    // streak: { type: Number, default: 0 },
    // lastActive: { type: Date, default: Date.now }, 
=======
    profile: {
      fullName: String,
      avatarUrl: String,
      bio: String,
    },
    settings: {
        dailyGoal: Number,
    },
    totalrevised: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now }, 
>>>>>>> 6c41057c3657902714bcd651e7e151738fd48d80
})

export default mongoose.model("Account" , Account_schema);

