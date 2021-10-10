const mongoose = require('mongoose')
const { toJSON } = require('./plugins')
const expendaturePurpose = require('./expendaturePurpose.model')

const resellerSchema = mongoose.Schema(
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
    photo: {
      type: String,
    },
    email: {
      type: String,
    },
    website: {
      type: String,
    },
    nid: {
      type: String,
    },
    address: {
      type: String,
      max: 50,
      trim: true,
    },

    billCollectionType: {
      type: String,
      enum: ['prepaid', 'postpaid', 'both'],
      required: true,
    },
    status: {
      type: String,
      enum: ['new', 'active', 'inactive', 'banned', 'deleted'],
      default: 'new',
    },
    expendaturePurposes: [expendaturePurpose],
    rechargeBalance: {
      type: Number,
      default: 0,
    },
    smsRate: {
      type: Number,
      default: 0.25,
    },
    commissionType: {
      type: String,
      enum: ['global', 'individual'],
    },
    commissionRate: {
      isp: Number,
      reseller: Number,
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
      objid: {
        type: String,
      },
    },
    permission: {
      customerAdd: {
        type: Boolean,
        default: true,
      },

      customerEdit: {
        type: Boolean,
        default: true,
      },

      customerDelete: {
        type: Boolean,
        default: true,
      },

      monthlyFeeEdit: {
        type: Boolean,
        default: true,
      },

      billEdit: {
        type: Boolean,
        default: true,
      },

      billPosting: {
        type: Boolean,
        default: true,
      },
      accounts: {
        type: Boolean,
        default: true,
      },
      inventory: {
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
      print: {
        type: Boolean,
        default: true,
      },
      collectorAdd: {
        type: Boolean,
        default: true,
      },
      collectorEdit: {
        type: Boolean,
        default: true,
      },
      viewTotalReport: {
        type: Boolean,
        default: true,
      },
      viewCollectorReport: {
        type: Boolean,
        default: true,
      },
      fileExport: {
        type: Boolean,
        default: true,
      },
    },
    ispOwner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'ispOwner',
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
resellerSchema.plugin(toJSON)

/**
 * @typedef Reseller
 */
const Reseller = mongoose.model('Reseller', resellerSchema)

module.exports = Reseller
