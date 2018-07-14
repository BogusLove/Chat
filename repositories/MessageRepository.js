const Message = require('../models/Message');
const UserRepository = require('../repositories/UserRepository');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    getOneByID: async (messageID) => {
        try {
            const message = await Message.findById(messageID);
            return message;
        } catch(err) {
            errHandle(err);
        }
    },

    getAll: async () => {
        try {
            const messages = await Message.find();
            return messages;
        } catch (err) {
            errHandle(err);
        }
    },

    getUserReceiversByID: async (userID) => {
        try {            
            return await Message.aggregate([
                { $project: {'receiverID': 1, 'senderID': 1, "_id": 0} },
                { $match: { 'senderID': {$eq: ObjectId(userID)} } },               
                { $group: { '_id': '$receiverID' } }
            ], async (err, docs) => {    
                let arr = [];
                if (err) console.log(err);                            
                for (let i = 0; i < docs.length; i++) {
                    arr.push(await UserRepository.getOneByID(docs[i]._id));
                }           
                console.log(arr);                
                return arr;
            })             
        } catch(err) {
            errHandle(err);
        }
    },

    insert: async (message) => {
        try {
            const newMessage = new Message({
                senderID: message.senderID,
                receiverID: message.receiverID,
                body: message.body
            });    
            const response = await newMessage.save();
            return response;
        } catch(err) {
            errHandle(err);
        }
    },

    update: async (messageID, newMessage) => {
        try {
            const options = {
                new: true,
                upsert: false
            };
            const response = await Message.findByIdAndUpdate({'_id': messageID}, newMessage, options);
            return response;
        } catch(err) {
            errHandle(err);
        }   
    },

    removeByID: async (messageID) => {
        try {
            const response = await Message.findByIdAndRemove(messageID).exec();
            return response
        } catch(err) {
            errHandle(err);
        }     
    }   
};

function errHandle(err) {
    console.error(err.message);
    return new Error(err.message);
}