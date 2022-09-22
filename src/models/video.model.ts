import { getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { User } from "./user.model";

export class Video extends TimeStamps {
  @prop({ required: true, ref: () => User })
  public owner: string;

  @prop({ required: true })
  public title: string;

  @prop({ required: true })
  public description: string;

  @prop({ required: true })
  public thumbnailUrl: string;

  @prop({ required: true })
  public videoUrl: string;

  @prop({ default: 0 })
  public views: number;

  @prop({ type: () => [String] })
  public tags: string[];

  @prop({ type: () => [String] })
  public likes: string[];

  @prop({ type: () => [String] })
  public dislikes: string[];
}

export const VideoModel = getModelForClass(Video, {
  schemaOptions: { timestamps: true },
});
