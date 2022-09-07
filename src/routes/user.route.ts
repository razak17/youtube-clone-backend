import express from "express";
import { processRequestBody } from "zod-express-middleware";

import requireUser from "../middleware/requireUser";
import { registerUserHandler } from "../controller/user.controller";
import { registerUserSchema } from "../schema/user.schema";

const router = express.Router();

router.get("/me", requireUser, (req, res) => {
  return res.send(res.locals.user);
});

router.post(
  "/register",
  processRequestBody(registerUserSchema.body),
  registerUserHandler
);

export default router;
