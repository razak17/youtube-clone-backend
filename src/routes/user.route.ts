import express from "express";
import { processRequestBody } from "zod-express-middleware";

import requireUser from "../middleware/requireUser";
import {
  deleteUserHandler,
  registerUserHandler,
  subscribeHandler,
  updateUserHandler,
} from "../controller/user.controller";
import { registerUserSchema, updateUserSchema } from "../schema/user.schema";
import { helloHandler } from "../routes";

const router = express.Router();

//get current user
router.get("/me", requireUser, (_, res) => {
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

//subscribe a user
router.put("/sub/:id", requireUser, subscribeHandler);

//unsubscribe a user
router.put("/unsub/:userId", requireUser, helloHandler);

//like a video
router.put("/like/:videoId", requireUser, helloHandler);

//dislike a video
router.put("/dislike/:videoId", requireUser, helloHandler);

export default router;
