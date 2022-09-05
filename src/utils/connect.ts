import mongoose from "mongoose";
import logger from "./logger";

async function connect(dbUri: string) {
  try {
    await mongoose.connect(dbUri);
    logger.info("DB connected");
  } catch (error) {
    logger.error("Could not connect to db");
    process.exit(1);
  }
}

export default connect;

