const httpStatus = require('http-status')
const { Manager } = require('../models')
const ApiError = require('../utils/ApiError')

const createManager = async (manager) => {
  return Manager.create(manager)
}

const getManagers = async () => {
  return Manager.find()
}

const getManagerById = async (id) => {
  return Manager.findById(id)
}

const updateManagerById = async (id, updatedManager) => {
  const manager = await getManagerById(id)
  if (!manager) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Manager not found')
  }
  Object.assign(manager, updatedManager)
  await manager.save()
  return manager
}

const deleteManagerById = async (id) => {
  const manager = await getManagerById(id)
  if (!manager) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Manager not found')
  }
  await manager.remove()
  return manager
}

module.exports = {
  getManagers,
  createManager,
  getManagerById,
  updateManagerById,
  deleteManagerById,
}
