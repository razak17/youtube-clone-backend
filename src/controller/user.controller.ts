import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import {
  RegisterUserBody,
  UpdateUserBody,
  UpdateUserParams,
} from "../schema/user.schema";
import {
  createUser,
  deleteUser,
  subscribe,
  unsubscribe,
  updateUser,
} from "../service/user.service";

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

export const deleteUserHandler = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (userId !== res.locals.user._id) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized.");
  }

  try {
    await deleteUser(userId);
    res.status(StatusCodes.OK).send("User deleted.");
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};

export const subscribeHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await subscribe(res.locals.user._id, id);
    res.status(StatusCodes.OK).send("Subscribed successfully.");
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};

export const unsubscribeHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await unsubscribe(res.locals.user._id, id);
    res.status(StatusCodes.OK).send("Unsubscribed successfully.");
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};
