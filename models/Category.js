const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {ObjectId} = mongoose.Schema;

const categorySchema = Schema({
  name: {
    type: String,
    required: true,    
  },
  itemId: [{
    type: ObjectId,
    ref: 'Item'
  }]
})

module.exports = mongoose.model('Category', categorySchema);
