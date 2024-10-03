import express from "express";
import { CreateFuelDelivery, getAllFuelDelivery, getOneFuelDelivery } from "../Controller/fuelDeliveryController.js";

const router = express.Router();

router.post("/", CreateFuelDelivery);
router.get("/", getAllFuelDelivery);
router.get("/:FuelDelivery", getOneFuelDelivery);
export default router;
