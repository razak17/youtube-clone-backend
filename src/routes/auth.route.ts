import express from "express";
import { processRequestBody } from "zod-express-middleware";
import { loginHandler } from "../controller/auth.controller";
import { loginSchema } from "../schema/auth.schema";

const router = express.Router();

router.post("/login", processRequestBody(loginSchema.body), loginHandler);

export default router;
