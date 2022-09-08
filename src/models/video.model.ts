import { getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class Video extends TimeStamps {
  @prop({ required: true })
  public ownerId: string;

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

  @prop()
  public tags: string[];

  @prop()
  public likes: string[];

  @prop()
  public dislikes: string[];
}

export const VideoModel = getModelForClass(Video, {
  schemaOptions: { timestamps: true },
});
