import express from "express";
import { newCommentSchema } from "../schema/comment.schema";
import { processRequestBody } from "zod-express-middleware";

import requireUser from "../middleware/requireUser";
import {
  deleteCommentHandler,
  getCommentsHandler,
  newCommentHandler,
} from "../controller/comment.controller";

const router = express.Router();

router.post(
  "/",
  requireUser,
  processRequestBody(newCommentSchema.body),
  newCommentHandler
);

router.delete("/:commentId", requireUser, deleteCommentHandler);

router.get("/:videoId", getCommentsHandler);

export default router;
