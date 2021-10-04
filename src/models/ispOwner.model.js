const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const expendaturePurpose = require('./expendaturePurpose.model');
const ispOwnerSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    signature: {
      type: String,
      required: true,
    },
    manager: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Manager',
      required: true,
    },
    billCollectionType: {
      type: String,
      enum: ['prepaid', 'postpaid', 'both'],
      required: true,
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
    },
    smsRate: {
      type: Number,
    },
    smsType: {
      type: String,
      enum: ['masking', 'nonMasking'],
    },
    settings: {
      invoiceHeader: {
        type: String,
      },
      invoiceFooter: {
        type: String,
      },
    },
    bpSettings: {
      package: {
        type: String,
        enum: ['Basic'],
        default: 'Basic',
      },
      customerLimit: {
        type: Number,
      },
      packageRate: {
        type: Number,
      },
      hasReseller: {
        type: Boolean,
        default: false,
      },
      inventory: {
        type: Boolean,
        default: false,
      },
      complaintManagement: {
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
);

// add plugin that converts mongoose to json
ispOwnerSchema.plugin(toJSON);

/**
 * @typedef ispOwner
 */
const IspOwner = mongoose.model('IspOwner', ispOwnerSchema);

module.exports = IspOwner;
