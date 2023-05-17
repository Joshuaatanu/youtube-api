import mongoose from "mongoose"
import { P } from "pino"
import logger from "./logger"
const DB_CONNECTION_STRING =
    process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/youtube-clone"

export async function connectToDatabase() {
    try {
        await mongoose.connect(DB_CONNECTION_STRING)
        logger.info("Connected to database")
    } catch (error) {
        logger.error(error, "failed to connect to database. goodbye")
        process.exit(1)
    }
}
export async   function disconnectFromDatabase() {
    await mongoose.connection.close()

    logger.info("Disconnected from database")

    return 
}