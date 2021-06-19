const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const memberSchema = Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
  type: String,
  required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true

  }
})

module.exports = mongoose.model('Member', memberSchema);
