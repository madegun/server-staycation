const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;


const itemSchema = Schema({
  title: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  sumBooking:{
    type: Number,
    default: 0,
  },
  country: {
    type: String,
    default: 'Indonesia',
  },
  city: {
    type: String,
    required: false,
  },
  isPopular: {
    type: Boolean,
    default: false
   
  },
  description: {
    type: String,
    required: false,
  },
  unit: {
    type: String,
    default: 'night'
  },

  imageId:[{
    type: ObjectId,
    ref: 'Image'
  }],
  featureId: [{
    type: ObjectId,
    ref: 'Feature'
  }],
  activityId: [{
    type: ObjectId,
    ref: 'Activity'
  }],
  categoryId: {
    type: ObjectId,
    ref: 'Category'
  }
})

module.exports = mongoose.model('Item', itemSchema);
