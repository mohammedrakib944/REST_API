const mongoose = require('mongoose')
const { toJSON } = require('./plugins')

const linemanSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 50,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      max: 100,
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
    },
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
linemanSchema.plugin(toJSON)

/**
 * @typedef Lineman
 */
const Lineman = mongoose.model('Lineman', linemanSchema)

module.exports = Lineman
