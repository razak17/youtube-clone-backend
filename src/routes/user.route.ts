import express from "express";
import { processRequestBody } from "zod-express-middleware";
import { registerUserHandler } from "../controller/user.controller";
import { registerUserSchema } from "../schema/user.schema";

const router = express.Router();

router.post("/register", processRequestBody(registerUserSchema.body), registerUserHandler);

export default router;
