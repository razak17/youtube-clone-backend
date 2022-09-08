import { object, string, TypeOf } from "zod";

export const newCommentSchema = {
  body: object({
    videoId: string(),
    description: string(),
  }),
};

export type newCommentBody = TypeOf<typeof newCommentSchema.body>;
