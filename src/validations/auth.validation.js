const Joi = require('joi')
const { password, mobile } = require('./custom.validation')

const register = {
  body: Joi.object().keys({
    company: Joi.string().min(3).max(50).required(),
    email: Joi.string().required().email(),
    mobile: Joi.string().required().custom(mobile),
    name: Joi.string().max(50).required(),
    pack: Joi.string()
      .required()
      .valid('Basic', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Old', 'P1', 'P2', 'P3', 'P4'),
  }),
}

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
}

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
}

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
}

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
}

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
}

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
}
