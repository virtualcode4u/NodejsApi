const mongoose = require('mongoose');

const schema = mongoose.Schema;
const userSchema = new schema({
    firntname:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model('user',userSchema )
