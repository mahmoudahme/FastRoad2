import mongoose from "mongoose";

const lockOutSchema = new mongoose.Schema(
  {
    KeyInCar: {
      type: Boolean,
      required: true,
    },
    timeOfHelp: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    onTheRoad : {
      type : String ,
      required : true
    },
    Location: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    UserId: {
      type:mongoose.Types.ObjectId ,
      required : true,
      ref : "User"
    }
  },
  { timestamps: true }
);
export default mongoose.model("lockout", lockOutSchema);
