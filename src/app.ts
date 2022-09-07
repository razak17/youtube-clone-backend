import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.route";
import userRoute from "./routes/user.route";
import { connect } from "./utils/database";
import deserializeUser from "./middleware/deserializeUser";

const main = async () => {
  const port = process.env.PORT;
  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(deserializeUser);

  app.use("/api/users", userRoute);
  app.use("/api/auth", authRoute);

  app.listen(port, async () => {
    console.log(`server started on http://localhost:${port}`);
    await connect();
  });
};

main().catch((err) => {
  console.error(err);
});
