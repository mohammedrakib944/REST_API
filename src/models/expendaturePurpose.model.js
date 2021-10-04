const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const expendaturePurposeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
expendaturePurposeSchema.plugin(toJSON);

/**
 * @typedef ExpendaturePurpose
 */
// const ExpendaturePurpose = mongoose.model('ExpendaturePurpose', expendaturePurposeSchema);

module.exports = expendaturePurposeSchema;
