require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Redis = require("ioredis");
const cors = require("cors");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const mediaRoutes = require("./routes/media-routes");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./utils/logger");

const app = express();

const PORT = process.env.PORT || 3003;

//connect to database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error);
  });

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    logger.info(`Received ${req.method} request to ${req.url}`);
    logger.info(`Request body, ${req.body}`);
    next();
  });

// //ip based rate limiting for sensitive endpoints
// const sensitiveEndpointLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 25,
//   standardHeaders: true,
//   legacyHeaders: false,
//   handler: (req, res) => {
//     logger.warn(`Rate limit for IP ${req.ip} exceeded on sensitive endpoint`);
//     res.status(429).send("Too many requests");
//   },
//   store: new RedisStore({
//     sendCommand: (...args) => redisClient.call(...args),
//   }),
// });

//apply sensitive endpoint rate limiting to sensitive endpoints
// app.use("/api/post/create-post", sensitiveEndpointLimiter);

app.use("/api/media", mediaRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Media service running on port ${PORT}`);
});

//unhandled promise rejection
process.on("unhandledRejection", (reason, promise) => {
    logger.error("Unhandled Rejection at", promise, "reason:", reason);
  });