import express from "express";
import { processRequestBody } from "zod-express-middleware";

import { helloHandler } from "../routes";
import requireUser from "../middleware/requireUser";
import { updateVideoSchema, uploadVideoSchema } from "../schema/video.schema";
import {
  deleteVideoHandler,
  findVideoHandler,
  randomVideosHandler,
  subbedVideosHandler,
  trendingVideosHandler,
  updateVideoHandler,
  uploadVideoHandler,
  viewCountHandler,
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
router.delete("/:videoId", requireUser, deleteVideoHandler);

// Find video by id
router.get("/:videoId", requireUser, findVideoHandler);

// Update video view count
router.put("/view/:videoId", requireUser, viewCountHandler);

// Get trending videos
router.get("/trending", requireUser, trendingVideosHandler);

// Get subscribed channels videos
router.get("/subbed", requireUser, subbedVideosHandler);

// Get videos randomly (for home page)
router.get("/random", randomVideosHandler);

// Get videos by tag
router.get("/tags", helloHandler);

// Video Search
router.get("/search", helloHandler);

export default router;
