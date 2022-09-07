import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { uploadVideo } from "../service/video.service";
import { UploadVideoBody } from "../schema/video.schema";

export async function uploadVideoHandler(
  req: Request<{}, {}, UploadVideoBody>,
  res: Response
) {
  const userId = res.locals.user._id;

  try {
    const video = await uploadVideo(userId, { ...req.body });
    return res.status(StatusCodes.OK).json(video);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
