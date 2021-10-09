const mongoose = require('mongoose')
const { toJSON } = require('./plugins')

const customerSchema = mongoose.Schema(
  {
    customerId: {
      type: String,
      max: 50,
      required: true,
    },
    name: {
      type: String,
      required: true,
      max: 50,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
      type: String, // users phone number default
    },
    address: {
      type: String,
      required: true,
      max: 100,
    },
    photo: {
      type: String,
    },
    email: {
      type: String,
    },
    nid: {
      type: String,
      max: 15,
      trim: true,
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
      required: true,
      default: 0,
    },
    monthlyFee: {
      type: Number,
      required: true,
    },
    billingCycle: {
      type: Date,
    },
    remarks: {
      type: String,
    },
    pppoe: {
      id: String,
      name: String,
      password: String,
      profile: String,
      limitBytesIn: Number,
      limitBytesOut: Number,
      disabled: Boolean,
      callerId: String,
      routes: String,
      comments: String,
    },
    queue: {},
    userType: {
      type: String,
      enum: ['pppoe', 'queue', 'hotspot'],
      default: 'pppoe',
    },
    billPayType: {
      type: String,
      enum: ['prepaid', 'postpaid'],
      default: 'prepaid',
    },
    autoDisable: {
      type: Boolean,
      default: true,
    },
    mikrotikPackage: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'MikrotikPackage',
    },
    mikrotik: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Mikrotik',
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
