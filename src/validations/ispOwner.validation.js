const Joi = require('joi')
const { objectId, mobile } = require('./custom.validation')

const createIspOwner = {
  body: Joi.object.keys({
    company: Joi.string().min(3).max(50).required(),
    user: Joi.string().custom(objectId),
    name: Joi.string().max(50).required(),
    mobile: Joi.string().max(11).required().custom(mobile),
    signature: Joi.string().max(35).required(),
    manager: Joi.string().custom(objectId),
    billCollectionType: Joi.string().required().valid('prepaid', 'postpaid', 'both'),
    email: Joi.string().email().required(),
    website: Joi.string().max(35),
    nid: Joi.string().max(15).required(),
    address: Joi.string().max(100),
    status: Joi.string().valid('new', 'active', 'inactive', 'banned', 'deleted'),
    smsGateway: Joi.string().max(300),
  }),
}

module.exports = {
  createIspOwner,
}
