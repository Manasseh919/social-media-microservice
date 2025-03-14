const Media = require("../models/media");
const { deleteMediaFromCloudinary } = require("../utils/cloudinary");
const logger = require("../utils/logger");

const handlePostDeleted = async (event) => {
  const { postId, mediaIds } = event;

  try {
    const mediaToDelete = await Media.find({ _id: { $in: mediaIds } });

    for (const media of mediaToDelete) {
      await deleteMediaFromCloudinary(media.publicId);
      await Media.findByIdAndDelete(media._id);

      logger.info(
        `Deleted media ${media._id} associated with this delete post ${postId}`
      );
    }

    logger.info(`Process deleteion of media for post id ${postId}`);
  } catch (error) {
    logger.error(error, "Error occured while media deletion");
  }
};

module.exports = { handlePostDeleted };
