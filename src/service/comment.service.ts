import { CommentModel, Comment } from "../models/comment.model";

export async function addComment(owner: string, update: Comment) {
  const newComment = new CommentModel({ ...update, owner });
  const savedComment = await newComment.save();

  return savedComment;
}
