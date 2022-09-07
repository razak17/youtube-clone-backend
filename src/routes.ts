import { Express, Request, Response } from "express";

export async function helloHandler(_: Request, res: Response) {
  return res.send({ message: "Hello Mom2!" });
}

function routes(app: Express) {
  /************************************************************************************************
  Auth route
  ************************************************************************************************/
  //Google Auth
  app.post("/api/auth/google", helloHandler);

  /************************************************************************************************
  Comments route
  ************************************************************************************************/
  app.post("/api/comments/", helloHandler);

  app.delete("/api/comments/:id", helloHandler);

  app.get("/api/comments/:videoId", helloHandler);
}

export default routes;
