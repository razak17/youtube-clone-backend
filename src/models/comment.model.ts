import { getModelForClass, prop } from "@typegoose/typegoose";
import { User } from "./user.model";

export class Comment {
  @prop({ required: true, ref: () => User })
  public owner: string;

  @prop({ required: true })
  public videoId: string;

  @prop({ required: true })
  public description: string;
}

export const CommentModel = getModelForClass(Comment, {
  schemaOptions: { timestamps: true },
});
