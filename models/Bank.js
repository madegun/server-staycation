const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bankSchema = Schema({
namaBank: {
   type: String,
   required: true
 },

 noRekening: {
  type: String,
 required: true
 },
 nama: {
   type: String,
   required: true
 },
 imageUrl:{
   type: String,
   required: true
 }

})

module.exports = mongoose.model('Bank', bankSchema);
