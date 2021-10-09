const mongoose = require('mongoose')
const { toJSON } = require('./plugins')

const collectorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      max: 50,
      trim: true,
      required: true,
    },
    mobile: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      max: 100,
      trim: true,
    },
    photo: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
    },
    nid: {
      type: String,
      max: 15,
    },
    areas: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Area',
      },
    ],
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    permissions: {},
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
      objId: {
        type: String,
      },
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
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
collectorSchema.plugin(toJSON)

/**
 * @typedef Collector
 */
const Collector = mongoose.model('Collector', collectorSchema)

module.exports = Collector
