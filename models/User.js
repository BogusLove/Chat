const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({    
    email: {
        type: String, 
        required: true,
        unique: true
    },
    full_name: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('User', schema);