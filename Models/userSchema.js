const mongoose = require('mongoose');

const schema = mongoose.Schema;
const userSchema = new schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    mobileno:{
        type:Number,
        required:true
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
    state:{
        type:String,
        required:false
    },
    city:{
    type:String,
        required:false
    },
    
    
})

module.exports = mongoose.model('Registeruser',userSchema )
