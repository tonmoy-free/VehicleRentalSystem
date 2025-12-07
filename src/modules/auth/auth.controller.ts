import { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;


    try {
        const result = await authServices.loginUser(email, password);

        res.status(200).json({
            success: true,
            message: "login successful",
            data: result
        })

    } catch (err: any) {
        console.log("DB Error =>", err);
        res.status(500).json({
            success: false,
            message: "Api is not working"
        })
    }
};

export const authController = {
    loginUser,
}