const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({    
    senderID: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    receiverID: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    body: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('Message', schema);