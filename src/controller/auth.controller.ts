import { Request, Response, NextFunction } from "express";
import { FilterQuery } from "mongoose";
import bcrypt from "bcrypt";

import UserModel, { UserDocument } from "../models/user.model";
import { SignUpInput, SignInInput } from "../schema/user.schema";
import logger from "../utils/logger";
import { signJwt } from "../utils/jwt";

export async function signUpHandler(
  req: Request<{}, {}, SignUpInput["body"]>,
  res: Response
) {
  try {
    const user = await UserModel.create(req.body);
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
export async function signInHandler(
  req: Request<{}, {}, SignInInput["body"]>,
  res: Response,
  next: NextFunction
) {
    return res.send({ message: "Hello Mom!" });
  //
  // try {
  //   const { name, password } = req.body;
  //   const user = await UserModel.findOne({ name });
  //   if (!user) return next(createError(res, 404, "User not found!"));
  //
  //   const isCorrect = await bcrypt.compare(password, user.password);
  //   if (!isCorrect) return next(createError(res, 400, "Wrong Credentials!"));
  //
  //   const token = signJwt(
  //     { ...user, id: user._id },
  //     process.env.JWT as string,
  //     { expiresIn: process.env.ACCESS_TOKEN_TTL as string } // 15 minutes
  //   );
  //   // const { password, ...others } = user._doc;
  //
  //   res
  //     .cookie("access_token", token, {
  //       httpOnly: true,
  //     })
  //     .status(200)
  //     .json(user);
  // } catch (err) {
  //   next(err);
  // }
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}
