
const logger = require('../utils/logger');

export const authenticateRequest = (req, res, next) => {
    const userId = req.headers['x-user-id'];
    if(!userId){
        logger.warn(`Access attempted without user id`)
        return res.status(401).json({
            success: false,
            message: "Unauthorized access"
        })
    }
    req.user = {userId}
    next()
}