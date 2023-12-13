const { Schema, model } = require('mongoose');

const countrySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true
    },
    postalcode: {
      type: Number,
      unique: true,
      trim: true
    },
    capital: {
        type: String,
        unique: true,
        trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Country', countrysSchema);