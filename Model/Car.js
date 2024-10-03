import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  make : {
    type:String , 
    required: true
  },
  model:{
    type:String , 
    required: true
  },
  year:{
    type:Number , 
    required: true
  },
  UserId: {
    type:mongoose.Types.ObjectId ,
    required : true
  }
})

export default mongoose.model("cars" , carSchema)