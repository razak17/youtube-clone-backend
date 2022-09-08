import express from "express";
import { processRequestBody } from "zod-express-middleware";

import { helloHandler } from "../routes";
import { loginSchema } from "../schema/auth.schema";
import { loginHandler } from "../controller/auth.controller";

const router = express.Router();

router.post("/login", processRequestBody(loginSchema.body), loginHandler);

router.post("/google", helloHandler);

export default router;
