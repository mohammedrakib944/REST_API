const mongoose = require('mongoose')
const { toJSON } = require('./plugins')
const expendaturePurpose = require('./expendaturePurpose.model')

const resellerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    email: {
      type: String,
    },
    website: {
      type: String,
    },
    nid: {
      type: String,
    },
    address: {
      type: String,
    },

    billCollectionType: {
      type: String,
      enum: ['prepaid', 'postpaid', 'both'],
      required: true,
    },
    status: {
      type: String,
      enum: ['new', 'active', 'inactive', 'banned', 'deleted'],
      default: 'new',
    },
    expendaturePurposes: [expendaturePurpose],
    rechargeBalance: {
      type: Number,
    },
    smsRate: {
      type: Number,
    },
    commissionType: {
      type: String,
      enum: ['global', 'individual'],
    },
    commissionRate: {
      isp: Number,
      reseller: Number,
    },
    reference: {
      name: {
        type: String,
      },
      mobile: {
        type: String,
      },
      type: {
        type: String,
      },
      objid: {
        type: String,
      },
    },
    ispOwner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'ispOwner',
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
resellerSchema.plugin(toJSON)

/**
 * @typedef Reseller
 */
const Reseller = mongoose.model('Reseller', resellerSchema)

module.exports = Reseller
