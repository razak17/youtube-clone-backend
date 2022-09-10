import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { dislikeVideo, getUserById, likeVideo } from "../service/user.service";

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
  try {
    await createUser({ ...req.body });
    return res.status(StatusCodes.CREATED).send("user created successfully");
  } catch (e) {
    console.log(e);
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

    return res.status(StatusCodes.OK).json(updatedUser);
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
    return res.status(StatusCodes.OK).send("User deleted.");
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};

export async function getUserHandler(req: Request, res: Response) {
  const { userId } = req.params;
  try {
    const user = await getUserById(userId);
    return res.status(StatusCodes.OK).send(user);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

export const subscribeHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = res.locals.user._id;
  if (id === userId) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .send("Cannot sub to your own channel.");
  }

  try {
    await subscribe(userId, id);
    return res.status(StatusCodes.OK).send("Subscribed successfully.");
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};

export const unsubscribeHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = res.locals.user._id;

  if (id === userId) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .send("Cannot unsub to your own channel.");
  }

  try {
    await unsubscribe(userId, id);
    return res.status(StatusCodes.OK).send("Unsubscribed successfully.");
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};

export const likeHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  const { videoId } = req.params;
  try {
    await likeVideo(videoId, userId);
    return res.status(StatusCodes.OK).send("video has been liked.");
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};

export const dislikeHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  const { videoId } = req.params;
  try {
    await dislikeVideo(videoId, userId);
    return res.status(StatusCodes.OK).send("video has been disliked.");
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};
