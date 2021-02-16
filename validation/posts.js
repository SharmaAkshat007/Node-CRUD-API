const joi = require("joi");

// Function for validating post data

const postCreation = (post) => {
  const schema = joi
    .object({
      author: joi.string().min(5).max(20).required(),
      title: joi.string().min(5).max(20).required(),
      body: joi.string().min(10).max(50).required(),
    })
    .options({ abortEarly: false });

  return schema.validate(post);
};

const postUpdate = (post) => {
  const schema = joi
    .object({
      author: joi.string().min(5).max(20).required(),
      title: joi.string().min(5).max(20).required(),
      body: joi.string().min(10).max(50).required(),
    })
    .options({ abortEarly: false });

  return schema.validate(post);
};

module.exports.postCreation = postCreation;
module.exports.postUpdate = postUpdate;
