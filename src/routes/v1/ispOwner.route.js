const express = require('express')
const ispOwnerController = require('../../controllers/ispOwner.controller')

const router = express.Router()

router.route('/').get(ispOwnerController.getIspOwners).post(ispOwnerController.createIspOwner)

router
  .route('/:id')
  .get(ispOwnerController.getIspOwner)
  .patch(ispOwnerController.updateIspOwner)
  .delete(ispOwnerController.deleteIspOwner)

module.exports = router
