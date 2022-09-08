import { Request, Response } from "express";

export async function helloHandler(_: Request, res: Response) {
  return res.send({ message: "Hello Mom!" });
}
