import express from "express";
import { processRequestBody } from "zod-express-middleware";

import requireUser from "../middleware/requireUser";
import { updateVideoSchema, uploadVideoSchema } from "../schema/video.schema";
import {
  deleteVideoHandler,
  findVideoHandler,
  getVideosByTagsHandler,
  randomVideosHandler,
  subbedVideosHandler,
  trendingVideosHandler,
  updateVideoHandler,
  uploadVideoHandler,
  videoSearchHandler,
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
router.get("/find/:videoId", findVideoHandler);

// Update video view count
router.put("/view/:videoId", viewCountHandler);

// Get trending videos
router.get("/trending", trendingVideosHandler);

// Get subscribed channels videos
router.get("/subscriptions", requireUser, subbedVideosHandler);

// Get videos randomly (for home page)
router.get("/random", randomVideosHandler);

// Get videos by tag
router.get("/tags", getVideosByTagsHandler);

// Video Search (by title)
router.get("/search", videoSearchHandler);

export default router;
