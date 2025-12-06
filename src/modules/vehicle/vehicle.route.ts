import express from "express";
import { vehicleController } from "./vehicle.controller";



const router = express.Router();

router.post("/api/v1/vehicles", vehicleController.createVehicle);

router.get("/api/v1/vehicles", vehicleController.getVehicle);

router.get("/api/v1/vehicles/:vehicleId", vehicleController.getVehicleById);

router.put("/api/v1/vehicles/:vehicleId", vehicleController.updateVehicle);

router.delete("/api/v1/vehicles/:vehicleId", vehicleController.deleteVehicle);


export const vehicleRoutes = router;