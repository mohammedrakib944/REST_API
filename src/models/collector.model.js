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
    permissions: {
      customerAdd: {
        type: Boolean,
        default: true,
      },

      customerEdit: {
        type: Boolean,
        default: true,
      },

      customerMobileEdit: {
        type: Boolean,
        default: true,
      },

      billPosting: {
        type: Boolean,
        default: true,
      },

      webLogin: {
        type: Boolean,
        default: true,
      },
      viewCustomerList: {
        type: Boolean,
        default: true,
      },
      sendSMS: {
        type: Boolean,
        default: true,
      },
      customerActivate: {
        type: Boolean,
        default: true,
      },
      customerDeactivate: {
        type: Boolean,
        default: true,
      },
      billPrint: {
        type: Boolean,
        default: true,
      },

      viewTotalReport: {
        type: Boolean,
        default: true,
      },
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
