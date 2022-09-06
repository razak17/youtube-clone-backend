import { Express, Request, Response } from "express";
import { processRequestBody } from "zod-express-middleware";
import {  registerUserSchema } from "./schema/user.schema";
import { loginSchema } from "./schema/auth.schema";
import { registerUserHandler } from "./controller/user.controller";
import { loginHandler } from "./controller/auth.controller";

export async function helloHandler(_: Request, res: Response) {
  return res.send({ message: "Hello Mom!" });
}

function routes(app: Express) {
  /************************************************************************************************
  HealthCheck
  ************************************************************************************************/
  app.get("/api/health", helloHandler);

  /************************************************************************************************
  Auth route
  ************************************************************************************************/
  //Create a User
  app.post("/api/auth/signup", processRequestBody(registerUserSchema.body), registerUserHandler);

  //Sign In
  app.post("/api/auth/signin", processRequestBody(loginSchema.body), loginHandler);

  //Google Auth
  app.post("/api/auth/google", helloHandler);

  /************************************************************************************************
  Users route
  ************************************************************************************************/
  //update user
  app.put("/api/users/:id", helloHandler);

  //delete user
  app.delete("/api/users/:id", helloHandler);

  //get a user
  app.get("/api/users/:id", helloHandler);

  //subscribe a user
  app.put("/api/users/sub/:id", helloHandler);

  //unsubscribe a user
  app.put("/api/users/unsub/:id", helloHandler);

  //like a video
  app.put("/api/users/like/:videoId", helloHandler);

  //dislike a video
  app.put("/api/users/dislike/:videoId", helloHandler);

  /************************************************************************************************
  Videos route
  ************************************************************************************************/
  app.post("/api/video/", helloHandler);

  app.put("/api/video/:id", helloHandler);

  app.delete("/api/video/:id", helloHandler);

  app.get("/api/video/find/:id", helloHandler);

  app.put("/api/video/view/:id", helloHandler);

  app.get("/api/video/trend", helloHandler);

  app.get("/api/video/random", helloHandler);

  app.get("/api/video/sub", helloHandler);

  app.get("/api/video/tags", helloHandler);

  app.get("/api/video/search", helloHandler);

  /************************************************************************************************
  Comments route
  ************************************************************************************************/
  app.post("/api/comments/", helloHandler);

  app.delete("/api/comments/:id", helloHandler);

  app.get("/api/comments/:videoId", helloHandler);
}

export default routes;
