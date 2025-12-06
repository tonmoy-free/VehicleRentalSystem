import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    const { name, email, password, phone, role } = req.body;

    try {
        const result = await userServices.createUser(name, email, password, phone, role);

        // Removing password before sending response
        // const user = result.rows[0];
        // delete user.password;
        // delete user.created_at;
        // delete user.updated_at;

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0]
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Api is not working"
        })
    }
};

const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getUsers();

        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows
        })
    } catch (err: any) {
        console.log("DB Error =>", err);
        res.status(500).json({
            success: false,
            message: "Api is not working"
        })
    }
}

export const userControllers = {
    createUser,
    getUsers,
}