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
};

const updateUser = async (req: Request, res: Response) => {
    const { name, email, phone, role } = req.body;
    try {
        const result = await userServices.updateUser(name, email, phone, role, req.params.userId);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

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
};

const deleteUser = async (req: Request, res: Response) => {
    // console.log(req.params.id);
    try {
        const result = await userServices.deleteUser(req.params.userId);

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
            })
        } else {
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: result.rows[0],
            })
        }
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
    updateUser,
    deleteUser,
}