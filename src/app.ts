import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import { connect } from "./utils/database";
import routes from "./routes";

const main = async () => {
  const port = process.env.PORT;
  const app = express();

  app.use(cookieParser());
  app.use(express.json());

  app.listen(port, async () => {
    console.log(`server started on http://localhost:${port}`);
    await connect();
    routes(app);
  });
};

main().catch((err) => {
  console.error(err);
});
