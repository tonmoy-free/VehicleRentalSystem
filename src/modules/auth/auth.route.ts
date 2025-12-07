import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/api/v1/auth/signin", authController.loginUser);


export const authRoutes = router;