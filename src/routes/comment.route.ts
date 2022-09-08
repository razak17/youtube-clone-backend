import express from "express";
import { newCommentSchema } from "../schema/comment.schema";
import { processRequestBody } from "zod-express-middleware";

import requireUser from "../middleware/requireUser";
import {
  deleteCommentHandler,
  getCommentHandler,
  newCommentHandler,
} from "../controller/comment.controller";

const router = express.Router();

router.post(
  "/",
  requireUser,
  processRequestBody(newCommentSchema.body),
  newCommentHandler
);

router.delete("/:id", requireUser, deleteCommentHandler);

router.get("/:videoId", requireUser, getCommentHandler);

export default router;
