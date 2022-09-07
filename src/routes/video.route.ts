import express from "express";
import { uploadVideoHandler } from "src/controller/video.controller";
import requireUser from "src/middleware/requireUser";
import { helloHandler } from "../routes";
import { processRequestBody } from "zod-express-middleware";
import { uploadVideoSchema } from "../schema/video.schema";

const router = express.Router();

// Upload video
router.post(
  "/",
  requireUser,
  processRequestBody(uploadVideoSchema.body),
  uploadVideoHandler
);

// Update Video
router.put("/:videoId", requireUser, helloHandler);

// Delete video
router.delete("/:videoId", requireUser, helloHandler);

// Find video by id
router.get("/find/:videoId", requireUser, helloHandler);

router.put("/view/:videoId", helloHandler);

router.get("/trend", helloHandler);

router.get("/random", helloHandler);

router.get("/sub", helloHandler);

router.get("/tags", helloHandler);

router.get("/search", helloHandler);

export default router;
