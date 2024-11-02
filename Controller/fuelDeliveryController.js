import FuelDelivery from "../Model/FuelDelivery.js";
import { verifyToken } from "../Utils/verifyToken.js";
import { ApiError } from "../Utils/apiError.js";
import History from "../Model/History.js";

import axios from "axios";

export const CreateFuelDelivery = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const {
          timeOfHelp,
          refuel,
          date,
          latitude,
          longitude,
          inPutText,
          paymentMethod,
          onTheRoad,
          year,
          model,
          color,
        } = req.body;
        if (inPutText == undefined) {
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;
          const response = await axios.get(url);
          const newFuelDelivery = new FuelDelivery({
            timeOfHelp: timeOfHelp,
            refuel: refuel,
            date: date,
            Location: response.data.display_name,
            onTheRoad: onTheRoad,
            paymentMethod : paymentMethod,
            year: year,
            model: model,
            color: color,
            UserId: req.user.id,
          });
          await newFuelDelivery.save();
          const newHistory = new History({
            UserId: req.user.id,
            serviceId: newFuelDelivery.id,
            onModel: "fuel Delivery",
          });
          await newHistory.save();
          res
            .status(200)
            .json({ message: "Your FuelDelivery Request Created" });
        } else {
          const newFuelDelivery = new FuelDelivery({
            timeOfHelp: timeOfHelp,
            refuel: refuel,
            date: date,
            Location: inPutText,
            onTheRoad: onTheRoad,
            paymentMethod : paymentMethod,
            year: year,
            model: model,
            color: color,
            UserId: req.user.id,
          });
          await newFuelDelivery.save();
          const newHistory = new History({
            UserId: req.user.id,
            serviceId: newFuelDelivery.id,
            onModel: "fuel Delivery",
          });
          await newHistory.save();
          res
            .status(200)
            .json({ message: "Your FuelDelivery Request Created" });
        }
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    } catch (error) {
      return next(new ApiError(`Server Error ${error}`, 400));
    }
  });
};

export const getAllFuelDelivery = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const MyFuelDelivery = await FuelDelivery.find({ UserId: req.user.id });
        res.status(200).json({ FuelDelivery: MyFuelDelivery });
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    } catch (error) {
      return next(new ApiError(`Server Error ${error}`, 400));
    }
  });
};
export const getOneFuelDelivery = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const FuelDeliveryId = req.params.FuelDelivery;
        const myFuelDelivery = await FuelDelivery.findById(FuelDeliveryId);
        res.status(200).json({ FuelDelivery: myFuelDelivery });
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    } catch (error) {
      return next(new ApiError(`Server Error ${error}`, 400));
    }
  });
};
