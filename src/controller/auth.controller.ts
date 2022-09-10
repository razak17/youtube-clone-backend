import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import omit from "../utils/omit";
import { findUserByEmail } from "../service/user.service";
import { GoogleLoginBody, LoginBody } from "../schema/auth.schema";
import { signJwt } from "../utils/jwt";
import { UserModel } from "../models/user.model";
import argon2 from "argon2";

const COOKIE_NAME = "accessToken";

export async function loginHandler(
  req: Request<{}, {}, LoginBody>,
  res: Response
) {
  const { email, password } = req.body;

  // find user by email
  const user = await findUserByEmail(email);
  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("Invalid email or password");
  }

  const isValid = await argon2.verify(user.password, password);
  if (!isValid) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("Invalid email or password");
  }

  const payload = omit(user.toJSON(), ["password"]);
  console.log(payload);
  const jwt = signJwt(payload);

  res.cookie(COOKIE_NAME, jwt, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
  });

  return res.status(StatusCodes.OK).send(jwt);
}

export async function googleLoginHandler(
  req: Request<{}, {}, GoogleLoginBody>,
  res: Response
) {
  const { username, email, profilePic } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    const newUser = new UserModel({
      username,
      email,
      profilePic,
      fromGoogle: true,
    });

    const savedUser = await newUser.save();

    const jwt = signJwt(savedUser.toJSON());
    res.cookie(COOKIE_NAME, jwt, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: false,
    });

    return res.status(StatusCodes.OK).send(jwt);
  }

  const payload = omit(user.toJSON(), ["password"]);

  const jwt = signJwt(payload);
  res.cookie(COOKIE_NAME, jwt, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
  });

  return res.status(StatusCodes.OK).send(jwt);
}

export async function logoutHandler(req: Request, res: Response) {
  const user = res.locals.user;
  console.log(user);

  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized.");
  }
  res.clearCookie(COOKIE_NAME);
  res.end();
}
