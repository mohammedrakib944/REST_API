const httpStatus = require('http-status')
const { Registration, User } = require('../models')
const ApiError = require('../utils/ApiError')

const createRegister = async (user) => {
  if (await User.isMobileTaken(user.mobile)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Mobile already taken')
  }

  const register = await Registration.create(user)
  return register
}

const updateRegisterStatus = async (id, status) => {
  const register = await Registration.findById(id)
  register.status = status
  await register.save()
  return register
}

module.exports = {
  createRegister,
  updateRegisterStatus,
}
