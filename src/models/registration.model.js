const mongoose = require('mongoose')
const { toJSON } = require('./plugins')

const registrationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    pack: {
      type: String,
      enum: ['Basic', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Old', 'P1', 'P2', 'P3', 'P4'],
      default: 'Basic',
    },
    status: {
      type: String,
      enum: ['success', 'pending', 'failed'],
      default: 'pending',
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
        enum: ['staff', 'distributor', 'other', 'client'],
        default: 'other',
      },
      objId: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
registrationSchema.plugin(toJSON)

/**
 * @typedef Registration
 */
const Registration = mongoose.model('Registration', registrationSchema)

module.exports = Registration
