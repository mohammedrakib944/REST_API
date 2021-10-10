const mongoose = require('mongoose')
const { toJSON } = require('./plugins')

const managerSchema = mongoose.Schema(
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
    address: {
      type: String,
      required: true,
      max: 100,
      trim: true,
    },
    photo: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    nid: {
      type: String,
      required: true,
      trim: true,
      max: 15,
    },
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
managerSchema.plugin(toJSON)

/**
 * @typedef Manager
 */
const Manager = mongoose.model('Manager', managerSchema)

module.exports = Manager
