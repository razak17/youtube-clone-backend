import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { addComment } from "../service/comment.service";
import { newCommentBody } from "../schema/comment.schema";

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
  try {
    // const comment = await addComment(userId, { ...req.body });
    // return res.status(StatusCodes.OK).json(comment);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

export async function getCommentHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  try {
    // const comment = await addComment(userId, { ...req.body });
    // return res.status(StatusCodes.OK).json(comment);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
