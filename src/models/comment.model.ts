import { getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class Comment extends TimeStamps {
  @prop({ required: true })
  public ownerId: string;

  @prop({ required: true })
  public title: string;

  @prop({ required: true })
  public description: string;
}

export const VideoModel = getModelForClass(Comment, {
  schemaOptions: { timestamps: true },
});
