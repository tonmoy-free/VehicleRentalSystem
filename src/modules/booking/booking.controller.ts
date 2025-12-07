import { Request, Response } from "express";
import { pool } from "../../config/db";
import { bookingServices } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;

    try {
        //date validation
        const startDate = new Date(rent_start_date);
        const endDate = new Date(rent_end_date);

        if (endDate <= startDate) {
            return res.status(400).json({
                success: false,
                message: "rent_end_date must be after rent_start_date "
            })
        };

        //vehicle daily rate
        const vehicleResult = await bookingServices.createBookingVehicleResult(vehicle_id);


        if (vehicleResult.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
        };

        const vehicle = vehicleResult.rows[0];

        //calculation
        const durationInMs = endDate.getTime() - startDate.getTime();
        const durationInDays = Math.ceil(durationInMs / (1000 * 60 * 60 * 24));

        //total_price
        const total_price = parseFloat(vehicle.daily_rent_price) * durationInDays;

        const bookingResult = await bookingServices.createBookingBookingResult(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price)

        //convert to number
        // const vehicle = result.rows[0];
        // vehicle.daily_rent_price = parseFloat(vehicle.daily_rent_price);


        const booking = bookingResult.rows[0];

        //Attach vehicle inside response
        booking.vehicle = {
            vehicle_name: vehicle.vehicle_name,
            daily_rent_price: parseFloat(vehicle.daily_rent_price)
        };

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking
        });

    } catch (err: any) {
        console.log("DB Error =>", err);
        res.status(500).json({
            success: false,
            message: "Api is not working"
        })
    }
};

export const bookingController = {
    createBooking,
}