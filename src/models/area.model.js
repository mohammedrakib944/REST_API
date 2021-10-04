const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const areaSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent: {
      type: mongoose.SchemaTypes.ObjectId,
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
);

// add plugin that converts mongoose to json
areaSchema.plugin(toJSON);

/**
 * @typedef Area
 */
const Area = mongoose.model('Area', areaSchema);

module.exports = Area;
