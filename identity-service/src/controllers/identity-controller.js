const logger = require("../utils/logger");
const { validateRegistration } = require("../utils/validation");
const User = require("../models/user");
const generateTokens = require("../utils/generateToken");

// user registration

const registerUser = async (req, res) => {
  logger.info("Registeration endpoint hit...");
  try {
    //validate the schema
    const { error } = validateRegistration(req.body);
    if (error) {
      logger.warn("validation error", error.details[0].message);
      return res
        .status(400)
        .json({ message: error.details[0].message, success: false });
    }

    const { username, email, password } = req.body;

    let user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (user) {
      logger.warn("User already exists");
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    user = new User({
      username,
      email,
      password,
    });

    await user.save();
    logger.warn("User registered successfully", user._id);

    const { accessToken, refreshToken } = await generateTokens(user);
    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    logger.error("Error registering user", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

//user login

//refresh token

//logout

module.exports = { registerUser };
