import express from "express";
import { processRequestBody } from "zod-express-middleware";

import requireUser from "../middleware/requireUser";
import {
  deleteUserHandler,
  registerUserHandler,
  updateUserHandler,
} from "../controller/user.controller";
import { registerUserSchema, updateUserSchema } from "../schema/user.schema";
import { helloHandler } from "../routes";

const router = express.Router();

//get current user
router.get("/me", requireUser, (req, res) => {
  return res.send(res.locals.user);
});

//register user
router.post(
  "/register",
  processRequestBody(registerUserSchema.body),
  registerUserHandler
);

//update user
router.put(
  "/:userId",
  processRequestBody(updateUserSchema.body),
  requireUser,
  updateUserHandler
);

//delete user
router.delete("/:userId", requireUser, deleteUserHandler);

//get a user
router.get("/:userId", requireUser, helloHandler);

//subscribe a user
router.put("/sub/:userId", requireUser, helloHandler);

//unsubscribe a user
router.put("/unsub/:userId", requireUser, helloHandler);

//like a video
router.put("/like/:videoId", requireUser, helloHandler);

//dislike a video
router.put("/dislike/:videoId", requireUser, helloHandler);

export default router;
