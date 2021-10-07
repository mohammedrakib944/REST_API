const mongoose = require('mongoose')
const { toJSON } = require('./plugins')

const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    email: {
      type: String,
    },
    nid: {
      type: String,
    },
    area: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Area',
    },
    status: {
      type: String,
      enum: ['unpaid', 'paid', 'overdue'],
    },
    balance: {
      type: Number,
    },
    billingCycle: {
      type: Date,
    },
    remarks: {
      type: String,
    },
    mikrotik: {
      username: String,
      password: String,
    },
    userType: {
      type: String,
      enum: ['pppoe', 'queue', 'hotspot'],
      default: 'pppoe',
    },
    billPayType: {
      type: String,
      enum: ['prepaid', 'postpaid'],
    },
    autoDisable: {
      type: Boolean,
      default: true,
    },
    ispOwner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'IspOwner',
    },
    reseller: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Reseller',
    },
  },
  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
customerSchema.plugin(toJSON)

/**
 * @typedef Customer
 */
const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer
