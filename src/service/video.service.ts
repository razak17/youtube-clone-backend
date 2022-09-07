import { Video, VideoModel } from "../models/video.model";

export async function uploadVideo(
  ownerId: string,
  update: Omit<Video, "ownerId" | "tags" | "likes" | "dislikes" | "views">
) {
  const newVideo = new VideoModel({ ownerId, update });
  const savedVideo = await newVideo.save();

  return savedVideo;
}
