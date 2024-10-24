import { verifyToken } from "../Utils/verifyToken.js";
import { ApiError } from "../Utils/apiError.js";
import History from "../Model/History.js";

export const getAllHistory = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        if (req.user.isAdmin) {
          const requests = await History.find().sort({ createdAt: -1 })
            .populate({ path: "UserId", select: "phone name-_id" })
            .populate({ path: "serviceId", select: "-_id -UserId" });
          res.status(200).json({ Requests: requests });
        }else{
          const requests = await History.find({UserId : req.user.id}).sort({ createdAt: -1 })
            .populate({ path: "UserId", select: "phone name-_id" })
            .populate({ path: "serviceId", select: "-_id -UserId" });
          res.status(200).json({ Requests: requests });
        }
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
};

export const getOneFromHistory = async (req, res, next) => {
    try {
      verifyToken(req , res , async()=>{
        if (req.user) {
          const id = req.params.id;
          const request = await History.findById(id).sort({ createdAt: -1 }).populate({ path: "UserId", select: "phone name-_id" })
          .populate({ path: "serviceId", select: "-_id -UserId" });
          res.status(200).json({ Requests: request });
        }else{
          return next(new ApiError("You are not authenticated!", 401));
        }
      })
    } catch (error) {
      return next(new ApiError("Error in Get", 400));
    }
}
