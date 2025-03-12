const logger = require("../utils/logger");


async function invalidatePostCache(req, postId = null) {
  try {
    const keysToDelete = [];

    // Invalidate a specific post if postId is provided
    if (postId) {
      keysToDelete.push(`post:${postId}`);
    }

    // Always invalidate post lists
    const postListKeys = await req.redisClient.keys("posts:*");
    keysToDelete.push(...postListKeys);

    if (keysToDelete.length > 0) {
      await req.redisClient.del(keysToDelete);
      logger.info(`Cache invalidated: ${keysToDelete.join(", ")}`);
    }
  } catch (error) {
    logger.error("Error invalidating cache:", error);
  }
}

module.exports = { invalidatePostCache };
