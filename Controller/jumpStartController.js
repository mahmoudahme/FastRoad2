import JumpStart from "../Model/JumpStart.js";
import { verifyToken } from "../Utils/verifyToken.js";
import { ApiError } from "../Utils/apiError.js";
import axios from "axios";
import History from "../Model/History.js";

export const CreateJumpStart = async (req, res, next) => {
  const apikey = "pk.269e5f03cafbf57f6dd5b92d3a8096eb";
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const {
          timeOfHelp,
          battery,
          date,
          latitude,
          longitude,
          inPutText,
          onTheRoad,
          paymentMethod ,
          year,
          model,
          color,
        } = req.body;
        if (inPutText == undefined) {
          const url = `https://us1.locationiq.com/v1/reverse.php?key=${apikey}&lat=${latitude}&lon=${longitude}&format=json`;
          const response = await axios.get(url);
          const newJumpStart = new JumpStart({
            timeOfHelp: timeOfHelp,
            battery: battery,
            date: date,
            Location: response.data.display_name,
            onTheRoad: onTheRoad,
            paymentMethod : paymentMethod,
            year: year,
            model: model,
            color: color,
            UserId: req.user.id,
          });
          await newJumpStart.save();
          const newHistory = new History({
            UserId: req.user.id,
            serviceId: newJumpStart.id,
            onModel: "JumpStart",
          });
          await newHistory.save();
          res.status(200).json({ message: "Your JumpStart Request Created" });
        } else {
          const newJumpStart = new JumpStart({
            timeOfHelp: timeOfHelp,
            battery: battery,
            date: date,
            Location: inPutText,
            onTheRoad: onTheRoad,
            paymentMethod : paymentMethod,
            year: year,
            model: model,
            color: color,
            UserId: req.user.id,
          });
          await newJumpStart.save();
          const newHistory = new History({
            UserId: req.user.id,
            serviceId: newJumpStart.id,
            onModel: "JumpStart",
          });
          await newHistory.save();
          res.status(200).json({ message: "Your JumpStart Request Created" });
        }
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    } catch (error) {
      return next(new ApiError(`Server Error ${error}`, 400));
    }
  });
};

export const getAllJumpStart = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const myJumpStart = await JumpStart.find({
          UserId: req.user.id,
        }).populate({ path: "UserId", select: "phone name-_id" });
        res.status(200).json({ JumpStarts: myJumpStart });
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    } catch (error) {
      return next(new ApiError(`Server Error ${error}`, 400));
    }
  });
};

export const getOneJumpStart = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const JumpStartId = req.params.JumpStartId;
        const myLockout = await JumpStart.findById(JumpStartId);
        res.status(200).json({ JumpStarts: myLockout });
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    } catch (error) {
      return next(new ApiError(`Server Error ${error}`, 400));
    }
  });
};
