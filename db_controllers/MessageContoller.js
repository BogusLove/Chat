const Message = require('../models/Message');

module.exports = {
    getOneByID: async (messageID) => {
        try {
            const message = await Message.findById(messageID);
            return {
                message: message,
                err: null
            };
        } catch(err) {
            return {
                message: null,
                err: err
            };
        }
    },

    getAll: async () => {
        try {
            const messages = await Message.find();
            return {
                messages: messages,
                err: null
            };
        } catch (err) {
            return {
                messages: null,
                err: err
            };
        }
    },

    getUserReceiversByID: async (userID) => {
        try {
            const users = await Message
                .find({'senderID': userID}, {'receiverID': 1, "_id": 0})
                // .populate({
                //     path: 'receiverID',
                //     select: 'full_name email'
                // })
                .then(docs => { return docs })
                .catch(err => { return err });
            return {
                users: users,
                err: null
            };
        } catch(err) {
            return {
                users: null,
                err: err
            };
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
            return {
                message: response,
                err: null
            }
        } catch(err) {
            return {
                message: null,
                err: err
            };
        }
    },

    update: async (messageID, newMessage) => {
        try {
            const options = {
                new: true,
                upsert: false
            };
            const response = await Message.findByIdAndUpdate({'_id': messageID}, newMessage, options);
            return {
                user: response,
                err: null
            }
        } catch(err) {
            return {
                users: null,
                err: err
            };
        }   
    },

    remove: async (messageID) => {
        try {
            const response = await Message
                .findByIdAndRemove(messageID)
                .exec();
            return {
                user: response,
                err: null
            };
        } catch(err) {
            return {
                user: null,
                err: err
            };
        }     
    }   
};