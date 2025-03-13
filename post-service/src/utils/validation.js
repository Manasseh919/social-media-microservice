const Joi = require("joi");
const joi = require("joi");

const validatePost = (data) => {
  const schema = joi.object({
    title: joi.string().min(3).required(),
    content: joi.string().min(3).required(),
    mediaIds:Joi.array()
  });

  return schema.validate(data);
};

module.exports = { validatePost };
