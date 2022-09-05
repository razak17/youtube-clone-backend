import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connect from "./utils/connect";
import routes from "./routes";

const main = async () => {
  const port = process.env.PORT;
  const dbUri = process.env.DB_URI;
  const app = express();

  app.use(express.json());

  app.listen(port, async () => {
    console.log(`server started on http://localhost:${port}`);
    if (dbUri) await connect(dbUri);
    routes(app);
  });
};

main().catch((err) => {
  console.error(err);
});
