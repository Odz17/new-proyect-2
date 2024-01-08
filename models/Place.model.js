const { Schema, model } = require('mongoose');


const placesSchema = new Schema(
  {
    title: {
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
    },
    author: {
      type: String,
      trim: true
    },
    rating: {
      type: Number,
      trim: true
    },
  },
  {
    timestamps: true
  }
);

module.exports = model('Place', placesSchema);