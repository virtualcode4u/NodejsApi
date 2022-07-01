const mongoose = require('mongoose');

const schema = mongoose.Schema;
const userSchema = new Sche({
name:{
type:String,
required:true
},
mobile:{
type:Number,
required:true,
}
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
