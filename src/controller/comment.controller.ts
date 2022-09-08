import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  addComment,
  deleteComment,
  findCommentsByVideoId,
} from "../service/comment.service";
import { newCommentBody } from "../schema/comment.schema";
import { CommentModel } from "../models/comment.model";

export async function newCommentHandler(
  req: Request<{}, {}, newCommentBody>,
  res: Response
) {
  const userId = res.locals.user._id;
  try {
    const comment = await addComment(userId, { ...req.body });
    return res.status(StatusCodes.OK).json(comment);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

export async function deleteCommentHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const { commentId } = req.params;
  const comment = await CommentModel.findById(commentId);

  if (!comment) {
    return res.status(StatusCodes.NOT_FOUND).send("Comment not found.");
  }

  if (userId !== comment.owner) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized.");
  }

  try {
    await deleteComment(commentId);
    return res.status(StatusCodes.OK).json("comment deleted");
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

export async function getCommentsHandler(req: Request, res: Response) {
  const { videoId } = req.params;
  try {
    const comment = await findCommentsByVideoId(videoId);
    return res.status(StatusCodes.OK).json(comment);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
