import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
    },
    recieved:{
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
