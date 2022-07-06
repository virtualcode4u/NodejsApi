const mongoose = require('mongoose');

const schema = mongoose.Schema;
const userSchema = new schema({
    catname:{
        type:String,
        unique:true,
        required:true
    },
    catdesc:{
        type:String,
        required:true
    },
    isrecclsd:{
        type:String,
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
