import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema(
  {
    UserId: {
      type:mongoose.Types.ObjectId ,
      required : true,
      ref : "User"
    } , 
    serviceId : {
      type:mongoose.Types.ObjectId ,
      required : true,
      refPath: 'onModel'
    },
    onModel: {
      type: String,
      required: true,
      enum: ['fuel Delivery', 'lockout' , 'Sellcar' , 'Tire' , 'JumpStart' ,'Tow'] 
    }
  },
  { timestamps: true }
);
export default mongoose.model("History", HistorySchema);
