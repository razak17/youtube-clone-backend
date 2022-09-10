import express from "express";
import { processRequestBody } from "zod-express-middleware";

import { googleLoginSchema, loginSchema } from "../schema/auth.schema";
import {
  googleLoginHandler,
  loginHandler,
  logoutHandler,
} from "../controller/auth.controller";
import requireUser from "../middleware/requireUser";

const router = express.Router();

router.post("/login", processRequestBody(loginSchema.body), loginHandler);

router.post("/logout", requireUser, logoutHandler);

router.post(
  "/google",
  processRequestBody(googleLoginSchema.body),
  googleLoginHandler
);

export default router;
