import { Request, Response, NextFunction } from "express";
import { FilterQuery } from "mongoose";

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
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}
