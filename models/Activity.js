const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const activitySchema = Schema({
  name: {
    type: String,
    required: true    
  },
  type: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  isPopular: {
    type: Boolean
   
  }, 
  itemId: {
    type: ObjectId,
    ref: 'Item'
  }

})

module.exports = mongoose.model('Activity', activitySchema);
