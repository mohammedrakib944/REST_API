const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const mikrotikPackageSchema = mongoose.Schema(
  {
    mikrotik: {
      type: String,
      required: true,
      index: true,
    },
    ispOwner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'ispOwner',
    },
    rate: {
      type: Number,
      required: true,
    },
    maxUp: {
      type: Number,
      required: true,
    },
    maxDown: {
      type: Number,
    },
    config: {
      type: String,
    },
    remarks: {
      type: String,
    },
    reseller: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Reseller',
    },
    type: {
      type: String,
      enum: ['ispOwner', 'reseller'],
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
mikrotikPackageSchema.plugin(toJSON);

/**
 * @typedef MikrotikPackage
 */
const MikrotikPackage = mongoose.model('MikrotikPackage', mikrotikPackageSchema);

module.exports = MikrotikPackage;
