const joi = require("joi");

const validatePost = (data) => {
  const schema = joi.object({
    title: joi.string().min(3).required(),
    content: joi.string().min(3).required(),
  });

  return schema.validate(data);
};

module.exports = { validatePost };
