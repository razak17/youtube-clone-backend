import express from "express";
import { processRequestBody } from "zod-express-middleware";

import requireUser from "../middleware/requireUser";
import {
  deleteUserHandler,
  dislikeHandler,
  getUserHandler,
  likeHandler,
  registerUserHandler,
  subscribeHandler,
  unsubscribeHandler,
  updateUserHandler,
} from "../controller/user.controller";
import { registerUserSchema, updateUserSchema } from "../schema/user.schema";

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

//get a user by id
router.get("/find/:userId", getUserHandler);

//subscribe a user
router.put("/sub/:id", requireUser, subscribeHandler);

//unsubscribe a user
router.put("/unsub/:id", requireUser, unsubscribeHandler);

//like a video
router.put("/like/:videoId", requireUser, likeHandler);

//dislike a video
router.put("/dislike/:videoId", requireUser, dislikeHandler);

export default router;
