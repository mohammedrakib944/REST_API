const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { collectorService } = require('../services')
const ApiError = require('../utils/ApiError')

const createCollector = catchAsync(async (req, res) => {
  const collector = collectorService.createCollector(req.body)
  res.status(httpStatus.CREATED).send(collector)
})

const getCollectors = catchAsync(async (req, res) => {
  const collectors = await collectorService.getCollectors()
  res.send(collectors)
})

const getCollector = catchAsync(async (req, res) => {
  const collector = await collectorService.getCollectorById(req.params.id)
  if (!collector) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Collector not found')
  }
  res.send(collector)
})

const updateCollector = catchAsync(async (req, res) => {
  const collector = await collectorService.updateCollectorById(req.params.id, req.body)
  res.send(collector)
})

const deleteCollector = catchAsync(async (req, res) => {
  await collectorService.deleteCollectorById(req.params.id)
  res.status(httpStatus.NO_CONTENT).send()
})

module.exports = {
  getCollectors,
  createCollector,
  getCollector,
  updateCollector,
  deleteCollector,
}
