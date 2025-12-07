import express from "express";
import { vehicleController } from "./vehicle.controller";
import auth from "../../middleware/auth";



const router = express.Router();

router.post("/api/v1/vehicles", auth("admin"), vehicleController.createVehicle);

router.get("/api/v1/vehicles", vehicleController.getVehicle);

router.get("/api/v1/vehicles/:vehicleId", vehicleController.getVehicleById);

router.put("/api/v1/vehicles/:vehicleId",auth("admin"), vehicleController.updateVehicle);

router.delete("/api/v1/vehicles/:vehicleId",auth("admin"), vehicleController.deleteVehicle);


export const vehicleRoutes = router;