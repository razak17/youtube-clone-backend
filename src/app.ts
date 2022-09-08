import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import { connect } from "./utils/database";
import authRoute from "./routes/auth.route";
import userRoute from "./routes/user.route";
import videoRoute from "./routes/video.route";
import commentRoute from "./routes/comment.route";
import deserializeUser from "./middleware/deserializeUser";

const main = async () => {
  const port = process.env.PORT;
  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(deserializeUser);

  app.use("/api/users", userRoute);
  app.use("/api/auth", authRoute);
  app.use("/api/videos", videoRoute);
  app.use("/api/comments", commentRoute);

  app.listen(port, async () => {
    console.log(`server started on http://localhost:${port}`);
    await connect();
  });
};

main().catch((err) => {
  console.error(err);
});
