import { User, UserModel } from "../models/user.model";

export async function findUserByEmail(email: User["email"]) {
  return UserModel.findOne({ email });
}

export async function createUser(
  user: Omit<
    User,
    "comparePassword" | "profilePic" | "subCount" | "subscribers" | "fromGoogle"
  >
) {
  return UserModel.create(user);
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

export async function subscribe(userId: string, id: string) {
  await UserModel.findByIdAndUpdate(userId, { $push: { subscribers: id } });
  await UserModel.findByIdAndUpdate(id, { $inc: { subCount: 1 } });
}

export async function unsubscribe(userId: string, id: string) {
  await UserModel.findByIdAndUpdate(userId, { $pull: { subscribers: id } });
  await UserModel.findByIdAndUpdate(id, { $inc: { subCount: -1 } });
}
