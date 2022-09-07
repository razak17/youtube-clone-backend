import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import {
  RegisterUserBody,
  UpdateUserBody,
  UpdateUserParams,
} from "../schema/user.schema";
import { createUser, updateUser } from "../service/user.service";

export async function registerUserHandler(
  req: Request<{}, {}, RegisterUserBody>,
  res: Response
) {
  const { name, email, password } = req.body;

  try {
    await createUser({ name, email, password });
    return res.status(StatusCodes.CREATED).send("user created successfully");
  } catch (e) {
    if (e.code === 11000) {
      return res.status(StatusCodes.CONFLICT).send("User already exists");
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

export const updateUserHandler = async (
  req: Request<UpdateUserParams, {}, UpdateUserBody>,
  res: Response
) => {
  const { userId } = req.params;

  if (userId !== res.locals.user._id) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
  }

  try {
    const updatedUser = await updateUser(
      userId,
      { ...req.body },
      { new: true }
    );

    res.status(StatusCodes.OK).json(updatedUser);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};
