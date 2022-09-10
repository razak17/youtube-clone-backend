import argon2 from "argon2";
import { VideoModel } from "../models/video.model";
import { User, UserModel } from "../models/user.model";

export async function findUserByEmail(email: User["email"]) {
  return UserModel.findOne({ email });
}

export async function createUser(
  user: Pick<User, "username" | "email" | "password">
) {
  const hash = await argon2.hash(user.password);
  const newUser = new UserModel({ ...user, password: hash });

  return await newUser.save();
}

export async function updateUser(
  userId: string,
  update: object,
  options: object
) {
  return UserModel.findByIdAndUpdate(userId, { $set: update }, options);
}

export async function deleteUser(userId: string) {
  return UserModel.findByIdAndDelete(userId);
}

export async function getUserById(userId: string) {
  return UserModel.findById(userId);
}

export async function subscribe(userId: string, id: string) {
  await UserModel.findByIdAndUpdate(userId, {
    $addToSet: { subscriptions: id },
  });
  await UserModel.findByIdAndUpdate(id, { $inc: { subscriberCount: 1 } });
  await UserModel.findByIdAndUpdate(id, { $addToSet: { subscribers: userId } });
  return;
}

export async function unsubscribe(userId: string, id: string) {
  await UserModel.findByIdAndUpdate(userId, { $pull: { subscriptions: id } });
  await UserModel.findByIdAndUpdate(id, { $inc: { subscriberCount: -1 } });
  await UserModel.findByIdAndUpdate(id, { $pull: { subscribers: userId } });
  return;
}

export async function likeVideo(videoId: string, userId: string) {
  return await VideoModel.findByIdAndUpdate(videoId, {
    $addToSet: { likes: userId },
    $pull: { dislikes: userId },
  });
}

export async function dislikeVideo(videoId: string, userId: string) {
  return await VideoModel.findByIdAndUpdate(videoId, {
    $addToSet: { dislikes: userId },
    $pull: { likes: userId },
  });
}
