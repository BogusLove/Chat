const User = require('../models/User');

module.exports = {
    getOneByID: async (userID) => {
        try {
            const user = await User.findById(userID);
            return {
                user: user,
                err: null
            };
        } catch(err) {
            return {
                user: null,
                err: err
            };
        }
    },

    getAll: async () => {
        try {
            const users = await User.find();
            return {
                users: users,
                err: null
            };
        } catch (err) {
            return {
                users: null,
                err: err
            };
        }
    },   

    insert: async (user) => {
        try {
            const newUser = new User({
                email: user.email,
                full_name: user.full_name
            });     
            const response = await newUser.save();
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

    update: async (userID, newUser) => {
        try {
            const options = {
                new: true,
                upsert: false
            };
            const response = await User.findByIdAndUpdate({'_id': userID}, newUser, options);
            console.log(response);            
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

    removeByID: async (userID) => {
        try {
            const response = await User
                .findByIdAndRemove(userID)
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