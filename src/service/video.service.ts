import { UserModel } from "../models/user.model";
import { Video, VideoModel } from "../models/video.model";

export async function uploadVideo(
  owner: string,
  update: Omit<Video, "owner" | "tags" | "likes" | "dislikes" | "views">
) {
  const newVideo = new VideoModel({ ...update, owner });
  return await newVideo.save();;
}

export async function updateVideo(
  videoId: string,
  update: Omit<Video, "owner" | "tags" | "likes" | "dislikes" | "views">,
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

export async function getTrendingVideos() {
  return await VideoModel.find().sort({ views: -1 });
}

export async function getSubbedVideos(userId: string) {
  const user = await UserModel.findById(userId);
  const subbedChannels = user?.subscriptions;

  if (!subbedChannels || user.subscriptions.length === 0) {
    return {};
  }

  let list = await Promise.all(
    subbedChannels.map(async (creatorId) => {
      const video = await VideoModel.find({ owner: creatorId });
      return video;
    })
  );

  return list
    .flat()
    .sort((a, b) => (b.createdAt as any) - (a.createdAt as any));
}

export async function getRandomVideos(count: number) {
  return await VideoModel.aggregate([{ $sample: { size: count } }]);
}

export async function getVideosByTag(tags: string[], limit: number) {
  return await VideoModel.find({ tags: { $in: tags } }).limit(limit);
}

export async function videoSearch(query: string, limit: number) {
  const videos = await VideoModel.find({
    title: { $regex: query, $options: "i" },
  }).limit(limit);

  return videos;
}
