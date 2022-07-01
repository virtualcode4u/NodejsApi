const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
name:{
type:String,
required:true
},
mobileno:{
type:Number,
required:true,
},
email:{
type:String,
unique:true,
required:true
},
password:{
type:String,
required:true
},

});

module.exports = mongoose.model('regusers',userSchema);
