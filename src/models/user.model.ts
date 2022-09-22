import { getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class User extends TimeStamps {
  @prop({ required: true, unique: true })
  public username: string;

  @prop({ required: true, unique: true })
  public email: string;

  @prop()
  public password: string;

  @prop({ default: "default" })
  public profilePic: string;

  @prop({ default: 0 })
  public subscriberCount: number;

  @prop({ type: () => [String] })
  public subscriptions: string[];

  @prop({ type: () => [String] })
  public subscribers: string[];

  @prop({ default: false })
  public fromGoogle: boolean;
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
