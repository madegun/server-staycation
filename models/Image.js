const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const imageSchema = Schema({
  imageUrl: {
    type: String,
    
  },
  item: {
    type: ObjectId,
    ref: 'Item'
  }
  
})

module.exports = mongoose.model('Image', imageSchema);
