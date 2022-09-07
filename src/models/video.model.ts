import { getModelForClass, prop  } from "@typegoose/typegoose";

export class Video {
  @prop()
  public ownerId: string;

  @prop()
  public title: string;

  @prop()
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
  schemaOptions: {
    timestamps: true,
  },
});
