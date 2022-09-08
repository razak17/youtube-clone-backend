import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import omit from "../utils/omit";
import { findUserByEmail } from "../service/user.service";
import { LoginBody } from "../schema/auth.schema";
import { signJwt } from "../utils/jwt";

export async function loginHandler(
  req: Request<{}, {}, LoginBody>,
  res: Response
) {
  const { email, password } = req.body;

  // find user by email
  const user = await findUserByEmail(email);

  if (!user || !user.comparePassword(password)) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("Invalid email or password");
  }

  const payload = omit(user.toJSON(), ["password"]);

  const jwt = signJwt(payload);

  res.cookie("accessToken", jwt, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
  });

  return res.status(StatusCodes.OK).send(jwt);
}
