const User = require('../models/User');

module.exports = {
    getOneByID: async (userID) => {
        try {
            const user = await User.findById(userID); 
            return user;
        } catch(err) {
            errHandle(err);
        }
    },

    getAll: async () => {
        try {
            const users = await User.find();
            return users;
        } catch (err) {
            errHandle(err);
        }
    },   

    insert: async (user) => {
        try {
            const newUser = new User({
                email: user.email,
                full_name: user.full_name
            });     
            const response = await newUser.save();
            return response;
        } catch(err) {
            errHandle(err);
        }
        
    },

    update: async (userID, newUser) => {
        try {
            const options = {
                new: true,
                upsert: false
            };
            const response = await User.findByIdAndUpdate({'_id': userID}, newUser, options);                    
            return response;
        } catch(err) {
            errHandle(err);
        }   
    },

    removeByID: async (userID) => {
        try {
            const response = await User.findByIdAndRemove(userID).exec();
            return response;
        } catch(err) {
            errHandle(err);
        }
    }
};

function errHandle(err) {
    console.error(err.message);
    return new Error(err.message);
}