import express from "express";
import { processRequestBody } from "zod-express-middleware";

import { helloHandler } from "../routes";
import requireUser from "../middleware/requireUser";
import { updateVideoSchema, uploadVideoSchema } from "../schema/video.schema";
import {
  updateVideoHandler,
  uploadVideoHandler,
} from "../controller/video.controller";

const router = express.Router();

// Upload video
router.post(
  "/",
  requireUser,
  processRequestBody(uploadVideoSchema.body),
  uploadVideoHandler
);

// Update Video
router.put(
  "/:videoId",
  requireUser,
  processRequestBody(updateVideoSchema.body),
  updateVideoHandler
);

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
