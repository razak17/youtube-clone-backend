import express from "express";
import { helloHandler } from "../routes";

const router = express.Router();

router.post("/", helloHandler);

router.delete("/:id", helloHandler);

router.get("/:id", helloHandler);

export default router;
