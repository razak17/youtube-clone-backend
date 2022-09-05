import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserInput {
  email: string;
  name: string;
  password: string;
  img?: string;
  subscribers?: number;
  subscribedUsers?: string;
  fromGoogle?: boolean;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  /* eslint-disable-next-line no-unused-vars */
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String },
    subscribers: { type: Number, default: 0 },
    subscribedUsers: { type: [String] },
    fromGoogle: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  let user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt_factor = process.env.SALT_WORK_FACTOR;

  if (salt_factor) {
    const salt = await bcrypt.genSalt(parseInt(salt_factor));

    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();
  }
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => e);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
