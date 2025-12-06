import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";

const router = express.Router();

router.post("/api/v1/auth/signup", userControllers.createUser);

router.get("/api/v1/users", userControllers.getUsers);

export const userRoutes = router;