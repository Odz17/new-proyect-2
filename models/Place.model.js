const { Schema, model } = require('mongoose');

const placesSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true
    },
    location: {
      type: String,
      lowercase: true,
      trim: true
    },
    image: {
      type: String,
      trim: true,
    },
    description: {
        type: String,
        trim: true
    }
  },
  {
    timestamps: true
  }
);



module.exports = model('Places', placesSchema);