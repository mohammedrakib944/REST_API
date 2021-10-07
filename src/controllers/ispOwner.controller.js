const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { ispOwnerService } = require('../services')
const ApiError = require('../utils/ApiError')

const createIspOwner = catchAsync(async (req, res) => {
  const IspOwner = ispOwnerService.createIspOwner(req.body)
  res.status(httpStatus.CREATED).send(IspOwner)
})

const getIspOwners = catchAsync(async (req, res) => {
  const ispOwners = await ispOwnerService.getIspOwners()
  res.send(ispOwners)
})

const getIspOwner = catchAsync(async (req, res) => {
  const ispOwner = await ispOwnerService.getIspOwner(req.params.id)
  if (!ispOwner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Isp Owner not found')
  }
  res.send(ispOwner)
})

const updateIspOwner = catchAsync(async (req, res) => {
  const ispOwner = await ispOwnerService.updateIspOwnerById(req.params.id, req.body)
  res.send(ispOwner)
})

const deleteIspOwner = catchAsync(async (req, res) => {
  await ispOwnerService.deleteIspOwnerById(req.params.id)
  res.status(httpStatus.NO_CONTENT).send()
})

module.exports = {
  getIspOwners,
  createIspOwner,
  getIspOwner,
  updateIspOwner,
  deleteIspOwner,
}
