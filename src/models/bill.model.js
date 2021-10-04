const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const billSchema = mongoose.Schema(
  {
    paidAmount: {
      type: Number,
      required: true,
    },
    dueAmount: {
      type: Number,
      required: true,
    },
    collector: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Collector',
    },
    customer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Customer',
    },
    ispOwner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'IspOwner',
    },
    reseller: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Reseller'
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
billSchema.plugin(toJSON);

/**
 * @typedef Bill
 */
const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
