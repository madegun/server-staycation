const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const bookingSchema = Schema({
  bookingStartDate: {
    type: Date     
  },
  bookingEndDate: {
    type: Date
  },
  invoice:{
    type: String,
    required: true
  },
  itemId: {
    _id: {
    type: ObjectId,
    ref: 'Item',    
    },
    title:{
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
  }, 
  
  total:{
    type: Number,
    required: true
  }, 
  memberId:{
    type: ObjectId,
    ref: 'Member',
    required: true
  },
  bankId:{
    type: ObjectId,
    ref: 'Bank',
   
  },
  payments: {
     proofPayment: {
    type: String,
    required: true
    },
    bankFrom: {
      type: String,
      required: true
    },
    accountHolder: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "Proses"
    }
  }
})

module.exports = mongoose.model('Booking', bookingSchema);
