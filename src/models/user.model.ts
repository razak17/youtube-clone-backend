import { getModelForClass, prop, pre } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import argon2 from "argon2";

@pre<User>("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hash = await argon2.hash(this.password);

    this.password = hash;
    return next();
  }
})
export class User extends TimeStamps {
  @prop({ required: true, unique: true })
  public username: string;

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true })
  public password: string;

  @prop({ default: "default" })
  public profilePic: string;

  @prop({ default: 0 })
  public subscriberCount: number;

  @prop()
  public subscriptions: string[];

  @prop()
  public subscribers: string[];

  @prop({ default: false })
  public fromGoogle: boolean;

  public async comparePassword(password: string): Promise<boolean> {
    return argon2.verify(this.password, password);
  }
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
