import express from "express";
import dotenv from "dotenv";
import connect from "./utils/connect";
dotenv.config();

const main = async () => {
  const port = process.env.PORT;
  const dbUri = process.env.DB_URI;
  const app = express();

  app.use(express.json());
  app.get("/", (req, res) =>
    res.json({
      message: "Hello Mom!",
    })
  );

  app.listen(port, async () => {
    dbUri && (await connect(dbUri));
  });
};

main().catch((err) => {
  console.error(err);
});
