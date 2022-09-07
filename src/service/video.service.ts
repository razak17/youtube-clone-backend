import { UserModel } from "../models/user.model";
import { Video, VideoModel } from "../models/video.model";

export async function uploadVideo(
  ownerId: string,
  update: Omit<Video, "ownerId" | "tags" | "likes" | "dislikes" | "views">
) {
  const newVideo = new VideoModel({ ownerId, update });
  const savedVideo = await newVideo.save();

  return savedVideo;
}

export async function updateVideo(
  videoId: string,
  update: Omit<Video, "ownerId" | "tags" | "likes" | "dislikes" | "views">,
  options: object
) {
  const updatedVideo = await VideoModel.findByIdAndUpdate(
    videoId,
    { $set: update },
    options
  );

  return updatedVideo;
}

export async function deleteVideo(videoId: string) {
  return VideoModel.findByIdAndDelete(videoId);
}

export async function findVideoById(videoId: string) {
  return VideoModel.findById(videoId);
}

export async function increaseViewCount(videoId: string) {
  return await VideoModel.findByIdAndUpdate(videoId, {
    $inc: { views: 1 },
  });
}

export async function getRandomVideos(count: number) {
  return await VideoModel.aggregate([{ $sample: { size: count } }]);
}

export async function getSubbedVideos(userId: string) {
  const user = await UserModel.findById(userId);
  const subbedChannels = user?.subscribers;

  if (!subbedChannels || user.subCount === 0) {
    return false;
  }

  const list = await Promise.all(
    subbedChannels.map(async (channelId) => {
      return await VideoModel.find({ ownerId: channelId });
    })
  );
  return list;
}

export async function getTrendingVideos() {
  return await VideoModel.find().sort({ views: -1 });
}
