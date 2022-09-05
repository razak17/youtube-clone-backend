import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface CommentInterface {
  userId: string;
  videoId: string;
  desc: string;
}

export interface UserDocument extends CommentInterface, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    videoId: { type: String, required: true },
    desc: { type: String, required: true },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model<UserDocument>("User", userSchema);

export default CommentModel;
