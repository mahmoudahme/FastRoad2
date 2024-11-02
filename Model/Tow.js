import mongoose from "mongoose";

const TowSchema = new mongoose.Schema(
  {
    timeOfHelp: {
      type: String,
      required: true,
    },
    typeofTowing:{
      type : String ,
      required : true ,
    },
    gear:{
      type : Boolean ,
      gear : true 
    },
    date: {
      type: String,
    },
    Location: {
      type: String,
      required: true,
    },
    onTheRoad:{
      type : String ,
      required : true ,
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
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    paymentMethod :  {
      type : String ,
      required : true
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tow", TowSchema);
