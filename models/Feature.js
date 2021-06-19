const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const featureSchema = Schema({
  name: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true

  },
  imageUrl: {
    type: String,
    required: true
  },

  itemId: {
    type: ObjectId,
    ref: 'Item'
  }

})

module.exports = mongoose.model('Feature', featureSchema);
