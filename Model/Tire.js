import mongoose from "mongoose";

const tireSchema = new mongoose.Schema(
  {
    Spire: {
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
      required : true
    }
  },
  { timestamps: true }
);
export default mongoose.model("Tire", tireSchema);
