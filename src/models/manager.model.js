const mongoose = require('mongoose')
const { toJSON } = require('./plugins')

const managerSchema = mongoose.Schema(
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
    permissions: [],
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
      required: true,
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
managerSchema.plugin(toJSON)

/**
 * @typedef Manager
 */
const Manager = mongoose.model('Manager', managerSchema)

module.exports = Manager
