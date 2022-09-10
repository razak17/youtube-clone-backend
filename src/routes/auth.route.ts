import express from "express";
import { processRequestBody } from "zod-express-middleware";

import { googleLoginSchema, loginSchema } from "../schema/auth.schema";
import {
  googleLoginHandler,
  loginHandler,
} from "../controller/auth.controller";

const router = express.Router();

router.post("/login", processRequestBody(loginSchema.body), loginHandler);

router.post(
  "/google",
  processRequestBody(googleLoginSchema.body),
  googleLoginHandler
);

export default router;
