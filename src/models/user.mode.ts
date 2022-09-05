import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserInterface {
  email: string;
  name: string;
  password: string;
  img?: string;
  subscribers: number;
  subscribedUsers: string;
  fromGoogle: boolean;
}

export interface UserDocument extends UserInterface, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String },
    subscribers: { type: Number, default: 0 },
    subscribedUsers: { type: [String] },
    fromGoogle: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
