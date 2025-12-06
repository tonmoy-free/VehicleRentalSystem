import { Request, Response } from "express";
import { pool } from "../../config/db";
import { vehicleServices } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;
    console.log(vehicle_name)

    try {
        const result = await vehicleServices.createVehicle(vehicle_name, type, registration_number, daily_rent_price, availability_status);

        //convert to number
        const vehicle = result.rows[0];
        vehicle.daily_rent_price = parseFloat(vehicle.daily_rent_price);


        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0]
        })

    } catch (err: any) {
        console.log("DB Error =>", err);
        res.status(500).json({
            success: false,
            message: "Api is not working"
        })
    }
};


export const vehicleController = {
    createVehicle,
}