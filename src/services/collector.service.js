const httpStatus = require('http-status')
const { Collector } = require('../models')
const ApiError = require('../utils/ApiError')

const createCollector = async (collector) => {
  return Collector.create(collector)
}

const getCollectors = async () => {
  return Collector.find()
}

const getCollectorById = async (id) => {
  return Collector.findById(id)
}

const updateCollectorById = async (id, updatedCollector) => {
  const collector = await getCollectorById(id)
  if (!collector) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Collector not found')
  }
  Object.assign(collector, updatedCollector)
  await collector.save()
  return collector
}

const deleteCollectorById = async (id) => {
  const collector = await getCollectorById(id)
  if (!collector) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Collector not found')
  }
  await collector.remove()
  return collector
}

module.exports = {
  getCollectors,
  createCollector,
  getCollectorById,
  updateCollectorById,
  deleteCollectorById,
}
