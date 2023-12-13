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
      unique: true,
      lowercase: true,
      trim: true
    },
    image: {
      type: String,
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

// const Places = model("Places", placesSchema);

module.exports = model('Places', placesSchema);