import express from "express";
import logger from "./utils/logger";
const PORT = process.env.PORT || 4000
const app = express()

const server = app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
})


function gracefulShutdown(signal: string) {
    process.on(signal, async () => {
        logger.info("goodbye, got signal");
        server.close();
        //db disconnect
        logger.info("my work here is done")
        process.exit
    })
}

const signals = ["SIGTERM", "SIGINT"]
for (let i = 0; i < signals.length; i++) {
    gracefulShutdown(signals[i])
}