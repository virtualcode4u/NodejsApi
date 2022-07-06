const mongoose = require('mongoose');

const schema = mongoose.Schema;
const userSchema = new schema({
    firstname:{
        type:String,
        
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    mobileno:{
        type:String,
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
    status:{
        type:String,
        required:true
    },
    created_by: {
        type: String, 
        required:false,
    },
    created_at: {
        type: Date, 
        default: Date.now
    },
    updated_by: {
        type: String, 
        required:false,
    },
    updated_at: {
        type: Date, 
        default: Date.now
    }
})


module.exports = mongoose.model('users',userSchema )
