const express = require('express')
const managerController = require('../../controllers/manager.controller')

const router = express.Router()

router.route('/').get(managerController.getManagers).post(managerController.createManager)

router
  .route('/:id')
  .get(managerController.getManager)
  .patch(managerController.updateManager)
  .delete(managerController.deleteManager)

module.exports = router
