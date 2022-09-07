import { Express, Request, Response } from "express";

export async function helloHandler(_: Request, res: Response) {
  return res.send({ message: "Hello Mom2!" });
}

function routes(app: Express) {
  /************************************************************************************************
  HealthCheck
  ************************************************************************************************/
  app.get("/api/health", helloHandler);

  /************************************************************************************************
  Auth route
  ************************************************************************************************/
  //Google Auth
  app.post("/api/auth/google", helloHandler);

  /************************************************************************************************
  Users route
  ************************************************************************************************/

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
