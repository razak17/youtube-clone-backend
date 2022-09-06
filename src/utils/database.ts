import mongoose from "mongoose";
import logger from "./logger";

export async function connect(dbUri: string) {
  try {
    await mongoose.connect(dbUri);
    logger.info("DB connected");
  } catch (error) {
    logger.error("Could not connect to db");
    process.exit(1);
  }
}

export async function disconnectFromDatabase() {
  await mongoose.connection.close();
  logger.info("Disconnect from database");
  return;
}
