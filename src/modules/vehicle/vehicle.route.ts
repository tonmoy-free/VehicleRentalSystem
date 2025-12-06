import express from "express";
import { vehicleController } from "./vehicle.controller";



const router = express.Router();

router.post("/api/v1/vehicles", vehicleController.createVehicle);

// router.get("/api/v1/users", userControllers.getUsers);

// router.put("/api/v1/users/:userId", userControllers.updateUser);

// router.delete("/api/v1/users/:userId", userControllers.deleteUser);


export const vehicleRoutes = router;