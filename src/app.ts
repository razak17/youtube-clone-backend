import express from "express";
import config from "config";
import dotenv from "dotenv";
dotenv.config();

const main = async () => {
  const PORT = config.get<number>("PORT");
  const app = express();
  app.use(express.json());

  app.get("/", (req, res) =>
    res.json({
      message: "Hello Mom!",
    })
  );

  app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
