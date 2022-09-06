import { getModelForClass, prop, pre } from "@typegoose/typegoose";
import argon2 from "argon2";

@pre<User>("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hash = await argon2.hash(this.password);

    this.password = hash;
    return next();
  }
})
export class User {
  @prop({ required: true, unique: true })
  public name: string;

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true })
  public password: string;

  @prop({})
  public img: string;

  @prop({ default: 0 })
  public subCount: number;

  @prop({ allowMixed: "ALLOW", ref: "", localField: "", foreignField: "" })
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
