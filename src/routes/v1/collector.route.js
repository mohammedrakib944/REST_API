const express = require('express')
const collectorController = require('../../controllers/collector.controller')

const router = express.Router()

router.route('/').get(collectorController.getCollectors).post(collectorController.createCollector)

router
  .route('/:id')
  .get(collectorController.getCollector)
  .patch(collectorController.updateCollector)
  .delete(collectorController.deleteCollector)

module.exports = router
