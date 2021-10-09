const mongoose = require('mongoose')
const { toJSON } = require('./plugins')

const mikrotikSchema = mongoose.Schema(
  {
    host: {
      type: String,
      required: true,
      max: 15,
      trim: true,
    },
    ispOwner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'IspOwner',
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    port: {
      type: String,
      required: true,
      max: 5,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
      max: 20,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
mikrotikSchema.plugin(toJSON)

/**
 * @typedef Mikrotik
 */
const Mikrotik = mongoose.model('Mikrotik', mikrotikSchema)

module.exports = Mikrotik
