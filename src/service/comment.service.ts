import { CommentModel, Comment } from "../models/comment.model";

export async function addComment(
  owner: string,
  update: Omit<Comment, "owner">
) {
  const newComment = new CommentModel({ ...update, owner });
  return await newComment.save();
}
