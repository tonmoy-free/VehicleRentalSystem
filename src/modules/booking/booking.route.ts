import express, { Request, Response } from "express";
import { bookingController } from "./booking.controller";


const router = express.Router();

router.post("/api/v1/bookings", bookingController.createBooking);

router.get("/api/v1/bookings", bookingController.getAllBooking);

router.put("/api/v1/bookings/:bookingId", bookingController.updateBooking);

// router.delete("/api/v1/users/:userId", userControllers.deleteUser);


export const bookingRoutes = router;