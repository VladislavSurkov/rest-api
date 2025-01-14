const Joi = require("joi");
const { ValidationError } = require("../../helpers/error");

const userValid = (req, res, next) => {
  const joiSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().required(),
    subscription: Joi.string(),
    token: Joi.string(),
  });

  const { error } = joiSchema.validate(req.body);
  if (error) {
    next(new ValidationError(error.message, 400));
  }
  next();
};

const verifyValid = (req, res, next) => {
  const joiSchema = Joi.object({ email: Joi.string().required() });

  const { error } = joiSchema.validate(req.body);
  if (error) {
    next(new ValidationError({ message: "missing required field email" }, 400));
  }
  next();
};

module.exports = { userValid, verifyValid };
