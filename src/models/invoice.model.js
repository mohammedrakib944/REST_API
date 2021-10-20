const mongoose = require('mongoose')
const { toJSON } = require('./plugins')

/* 
! We need to update invoice schema
 */
const invoiceSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
    },
    prevDue: {
      type: Number,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    type: {
      type: String,
      enum: ['registration', 'monthlyServiceCharge', 'migration', 'smsPurchase'],
      default: 'monthlyServiceCharge',
      required: true,
    },
    status: {
      type: String,
      enum: ['unpaid', 'paid', 'overdue'],
    },
    paymentThrough: {
      type: String,
      enum: ['sslcommerz', 'bkash', 'rocket', 'nagad', 'cash', 'others'],
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
invoiceSchema.plugin(toJSON)

/**
 * @typedef Invoice
 */
const Invoice = mongoose.model('Invoice', invoiceSchema)

module.exports = Invoice
