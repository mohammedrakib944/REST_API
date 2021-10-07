const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { managerService } = require('../services')
const ApiError = require('../utils/ApiError')

const createManager = catchAsync(async (req, res) => {
  const manager = managerService.createManager(req.body)
  res.status(httpStatus.CREATED).send(manager)
})

const getManagers = catchAsync(async (req, res) => {
  const managers = await managerService.getManagers()
  res.send(managers)
})

const getManager = catchAsync(async (req, res) => {
  const manager = await managerService.getManagerById(req.params.id)
  if (!manager) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Manager not found')
  }
  res.send(manager)
})

const updateManager = catchAsync(async (req, res) => {
  const manager = await managerService.updateManagerById(req.params.id, req.body)
  res.send(manager)
})

const deleteManager = catchAsync(async (req, res) => {
  await managerService.deleteManagerById(req.params.id)
  res.status(httpStatus.NO_CONTENT).send()
})

module.exports = {
  getManagers,
  createManager,
  getManager,
  updateManager,
  deleteManager,
}
