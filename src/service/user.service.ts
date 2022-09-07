import { User, UserModel } from "../models/user.model";

export async function createUser(
  user: Omit<
    User,
    "comparePassword" | "profilePic" | "subCount" | "subscribers" | "fromGoogle"
  >
) {
  return UserModel.create(user);
}

export async function findUserByEmail(email: User["email"]) {
  return UserModel.findOne({ email });
}

export async function updateUser(
  userId: string,
  update: object,
  options: object
) {
  return UserModel.findByIdAndUpdate(userId, { $set: update }, options);
}
