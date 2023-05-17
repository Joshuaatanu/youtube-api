import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import helmet from "helmet"
import logger from "./utils/logger";
import { connectToDatabase, disconnectFromDatabase } from "./utils/database";
import { CORS_ORIGIN } from "./constants";
import userRoute from "./modules/user/user.route";
import authRoute from "./modules/auth/auth.route";

const PORT = process.env.PORT || 4000

const app = express()
///////////////////////// express middleware ////////////////////////////
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true
}))
app.use(helmet())


//////////////////////////// ROUTES ////////////////////////////////////
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)


//////////////////////////// SERVER  //////////////////////////////////

const server = app.listen(PORT, async () => {
    await connectToDatabase()
    logger.info(`Server is running on http://localhost:${PORT}`);
})


function gracefulShutdown(signal: string) {
    process.on(signal, async () => {
        logger.info("goodbye, got signal");
        server.close();
        //db disconnect
        await disconnectFromDatabase()
        logger.info("my work here is done")
        process.exit
    })
}

const signals = ["SIGTERM", "SIGINT"]
for (let i = 0; i < signals.length; i++) {
    gracefulShutdown(signals[i])
}