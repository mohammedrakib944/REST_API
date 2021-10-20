const mongoose = require('mongoose')
const { toJSON } = require('./plugins')
/*
! this schema needs to be updated 
 */
const sslPaymentSchema = mongoose.Schema(
  {
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invoice',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    ispOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'IspOwner',
    },
    type: {
      type: String,
      required: true,
      enum: ['ispOwner', 'manager', 'anonymous'],
      default: 'anonymous',
    },
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['CANCELLED', 'FAILED', 'PENDING', 'SUCCESS'],
      default: 'PENDING',
    },
    transactionID: {
      required: true,
      type: String,
    },
    currency: {
      required: true,
      type: String,
      default: 'BDT',
      enum: ['BDT'],
    },
  },
  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
sslPaymentSchema.plugin(toJSON)

/**
 * @typedef SSLPayment
 */
const SSLPayment = mongoose.model('SSLPayment', sslPaymentSchema)

module.exports = SSLPayment
