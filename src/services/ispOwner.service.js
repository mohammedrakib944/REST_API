const httpStatus = require('http-status')
const { IspOwner } = require('../models')
const ApiError = require('../utils/ApiError')

const createIspOwner = async (ispOwner) => {
  const owner = await IspOwner.create(ispOwner)
  return owner
}

const getIspOwners = async () => {
  return IspOwner.find()
}

const getIspOwnerById = async (id) => {
  return IspOwner.findById(id)
}

const updateIspOwnerById = async (id, updatedIspOwner) => {
  const ispOwner = await getIspOwnerById(id)
  if (!ispOwner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Isp Owner not found')
  }
  Object.assign(ispOwner, updatedIspOwner)
  await ispOwner.save()
  return ispOwner
}

const deleteIspOwnerById = async (id) => {
  const ispOwner = await getIspOwnerById(id)
  if (!ispOwner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Isp Owner not found')
  }
  await ispOwner.remove()
  return ispOwner
}

module.exports = {
  getIspOwners,
  createIspOwner,
  getIspOwnerById,
  updateIspOwnerById,
  deleteIspOwnerById,
}
