import { CommentModel, Comment } from "../models/comment.model";

export async function addComment(
  owner: string,
  update: Omit<Comment, "owner">
) {
  const newComment = new CommentModel({ ...update, owner });
  return await newComment.save();
}

export async function deleteComment(commentId: string) {
  return CommentModel.findByIdAndDelete(commentId);
}

export async function findCommentsByVideoId(videoId: string) {
  return CommentModel.find({ videoId });
}
