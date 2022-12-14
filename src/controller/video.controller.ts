import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import {
  deleteVideo,
  findVideoById,
  getRandomVideos,
  getSubbedVideos,
  getTrendingVideos,
  getVideosByTag,
  increaseViewCount,
  updateVideo,
  uploadVideo,
  videoSearch,
} from "../service/video.service";
import { UpdateVideoParams, UploadVideoBody } from "../schema/video.schema";
import { VideoModel } from "../models/video.model";

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
  const userId = res.locals.user._doc;
  const { videoId } = req.params;
  console.log(userId);
  const video = await VideoModel.findById(videoId);

  if (!video) {
    return res.status(StatusCodes.NOT_FOUND).send("Video not found.");
  }

  if (userId !== video.owner) {
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
  const { videoId } = req.params;
  const video = await VideoModel.findById(videoId);

  if (!video) {
    return res.status(StatusCodes.NOT_FOUND).send("Video not found.");
  }

  if (userId !== video.owner) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized.");
  }

  try {
    await deleteVideo(videoId);
    return res.status(StatusCodes.OK).send("video deleted.");
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

export async function findVideoHandler(req: Request, res: Response) {
  const { videoId } = req.params;
  try {
    const video = await findVideoById(videoId);
    return res.status(StatusCodes.OK).json(video);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

export async function viewCountHandler(req: Request, res: Response) {
  const { videoId } = req.params;
  try {
    await increaseViewCount(videoId);
    return res.status(StatusCodes.OK).send("View count has increased by 1.");
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

export async function randomVideosHandler(_: Request, res: Response) {
  try {
    const videos = await getRandomVideos();
    return res.status(StatusCodes.OK).json(videos);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

export async function trendingVideosHandler(_: Request, res: Response) {
  try {
    const videos = await getTrendingVideos();
    return res.status(StatusCodes.OK).json(videos);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

export async function subbedVideosHandler(_: Request, res: Response) {
  const userId = res.locals.user._id;
  try {
    const videos = await getSubbedVideos(userId);
    return res.status(StatusCodes.OK).json(videos);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

export async function getVideosByTagsHandler(req: Request, res: Response) {
  const tags = req.query.tags as string;
  const videoTags = tags.split(",");
  try {
    const videos = await getVideosByTag(videoTags);
    return res.status(StatusCodes.OK).json(videos);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

export async function videoSearchHandler(req: Request, res: Response) {
  const query = req.query.q as string;
  try {
    const videos = await videoSearch(query);
    return res.status(StatusCodes.OK).json(videos);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
