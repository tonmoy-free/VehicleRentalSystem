import express, { Request, Response } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth";


const router = express.Router();

router.post("/api/v1/bookings",auth("admin","customer"), bookingController.createBooking);

router.get("/api/v1/bookings",auth("admin","customer"), bookingController.getAllBooking);

router.put("/api/v1/bookings/:bookingId",auth("admin","customer"), bookingController.updateBooking);

// router.delete();


export const bookingRoutes = router;