const mongoose = require('mongoose');

const schema = mongoose.Schema;
const productSchema = new schema({
    category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true
    },
    subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subcategory',
    required: true
    },
    productname:{
        type:String,
        required:true
    },
    productdesc: {
    type: String,
    required: true
   },
    isrecclsd:{
        type:String,
    },
    created_by: {
        type: String, 
        required:true,
    },
    created_at: {
        type: Date, 
        default: Date.now
    },
    updated_by: {
        type: String, 
        required:true,
    },
    updated_at: {
        type: Date, 
        default: Date.now
    },
})

module.exports = mongoose.model('products',productSchema )




const productSchema = mongoose.Schema({
  name: {
      type: String,
      required: true,
  },
  description: {
      type: String,
      required: true
  },
  price : {
      type: Number,
      default:0
  },
  
  countInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255
  },
})