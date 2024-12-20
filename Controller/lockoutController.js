import LockOut from "../Model/LockOut.js";
import { verifyToken } from "../Utils/verifyToken.js";
import { ApiError } from "../Utils/apiError.js";
import axios from "axios";
import History from "../Model/History.js";

export const CreateLockOut = async (req, res, next) => {
  const apikey = "pk.269e5f03cafbf57f6dd5b92d3a8096eb";
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const {
          KeyInCar,
          timeOfHelp,
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
          const newLockOut = new LockOut({
            KeyInCar: KeyInCar,
            timeOfHelp: timeOfHelp,
            date: date,
            Location: response.data.display_name,
            onTheRoad : onTheRoad ,
            paymentMethod : paymentMethod,
            year: year,
            model: model,
            color: color,
            UserId: req.user.id,
          });
          await newLockOut.save();
          const newHistory = new History({
            UserId: req.user.id,
            serviceId: newLockOut.id,
            onModel: "lockout",
          });
          await newHistory.save();
          res.status(200).json({ message: "Your LockOut Request Created" });
        } else {
          const newLockOut = new LockOut({
            KeyInCar: KeyInCar,
            timeOfHelp: timeOfHelp,
            date: date,
            Location: inPutText,
            onTheRoad : onTheRoad ,
            paymentMethod : paymentMethod,
            year: year,
            model: model,
            color: color,
            UserId: req.user.id,
          });
          await newLockOut.save();
          const newHistory = new History({
            UserId: req.user.id,
            serviceId: newLockOut.id,
            onModel: "lockout",
          });
          await newHistory.save();
          res.status(200).json({ message: "Your LockOut Request Created" });
        }
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    } catch (error) {
      return next(new ApiError(`Server Error ${error}`, 400));
    }
  });
};

export const getAllLockout = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const myLockout = await LockOut.find({ UserId: req.user.id }).populate({
          path: "UserId",
          select: "phone name-_id",
        });
        res.status(200).json({ Lockout: myLockout });
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    } catch (error) {
      return next(new ApiError(`Server Error ${error}`, 400));
    }
  });
};
export const getOneLockOut = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const LockOutId = req.params.LockOutId;
        const myLockout = await LockOut.findById(LockOutId);
        res.status(200).json({ Lockout: myLockout });
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    } catch (error) {
      return next(new ApiError(`Server Error ${error}`, 400));
    }
  });
};
