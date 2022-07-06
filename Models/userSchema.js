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
    status:{
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

module.exports = mongoose.model('Registeruser',userSchema )
