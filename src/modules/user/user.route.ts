import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";
import logger from "../../middleware/logger";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/api/v1/auth/signup", userControllers.createUser);

router.get("/api/v1/users", logger, auth("admin","customer"), userControllers.getUsers);

router.put("/api/v1/users/:userId", userControllers.updateUser);

router.delete("/api/v1/users/:userId", userControllers.deleteUser);


export const userRoutes = router;