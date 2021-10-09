const mongoose = require('mongoose')
const { toJSON } = require('./plugins')
const expendaturePurpose = require('./expendaturePurpose.model')

const ispOwnerSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name can't be empty"],
      min: 3,
      max: [50, 'Company name must be less than 50 character'],
      trim: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
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
    signature: {
      type: String,
      required: true,
      max: 35,
      trim: true,
    },
    manager: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Manager',
    },
    billCollectionType: {
      type: String,
      enum: ['prepaid', 'postpaid', 'both'],
      required: true,
      default: 'prepaid',
    },
    photo: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    website: {
      type: String,
      max: 35,
      trim: true,
    },
    nid: {
      type: String,
      required: true,
      max: 15,
    },
    address: {
      type: String,
      max: 100,
      trim: true,
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
    status: {
      type: String,
      enum: ['new', 'active', 'inactive', 'banned', 'deleted'],
      default: 'new',
    },
    expendaturePurposes: [expendaturePurpose],
    mikrotiks: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Mikrotik',
      },
    ],
    smsBalance: {
      type: Number,
      required: true,
      default: 0,
    },
    smsRate: {
      type: Number,
      required: true,
      default: 0.25,
    },
    smsType: {
      type: String,
      enum: ['masking', 'nonMasking', 'other'],
      default: 'nonMasking',
    },
    smsGateway: {
      type: String,
      max: 300,
      trim: true,
    },
    maskingId: {
      type: String,
      max: 11,
      trim: true,
    },
    settings: {
      invoiceHeader: {
        type: String,
        trim: true,
        max: 100,
      },
      invoiceFooter: {
        type: String,
        trim: true,
        max: 100,
      },
    },
    bpSettings: {
      package: {
        type: String,
        enum: ['Basic', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Old', 'P1', 'P2', 'P3', 'P4'],
        default: 'Basic',
        required: true,
      },
      customerLimit: {
        type: Number,
        required: true,
      },
      packageRate: {
        type: Number,
        required: true,
      },
      hasReseller: {
        type: Boolean,
        default: false,
      },
      inventory: {
        type: Boolean,
        default: false,
      },
      complainManagement: {
        type: Boolean,
        default: false,
      },
      customerPortal: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
ispOwnerSchema.plugin(toJSON)

/**
 * @typedef ispOwner
 */
const IspOwner = mongoose.model('IspOwner', ispOwnerSchema)

module.exports = IspOwner
