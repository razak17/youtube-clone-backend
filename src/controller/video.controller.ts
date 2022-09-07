import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import {
  deleteVideo,
  updateVideo,
  uploadVideo,
} from "../service/video.service";
import { UpdateVideoParams, UploadVideoBody } from "../schema/video.schema";
import { VideoModel } from "src/models/video.model";

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

export async function updateVideoHandler(
  req: Request<UpdateVideoParams, {}, UploadVideoBody>,
  res: Response
) {
  const userId = res.locals.user._id;
  const videoId = req.params.videoId;
  const video = await VideoModel.findById(videoId);

  if (!video) {
    return res.status(StatusCodes.NOT_FOUND).send("Video not found.");
  }

  if (userId !== video.ownerId) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized.");
  }

  try {
    const updatedVideo = await updateVideo(
      videoId,
      { ...req.body },
      { new: true }
    );
    return res.status(StatusCodes.OK).json(updatedVideo);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

export async function deleteVideoHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const videoId = req.params.videoId;
  const video = await VideoModel.findById(videoId);

  if (!video) {
    return res.status(StatusCodes.NOT_FOUND).send("Video not found.");
  }

  if (userId !== video.ownerId) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized.");
  }

  try {
    await deleteVideo(videoId);
    return res.status(StatusCodes.OK).json("video deleted.");
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
