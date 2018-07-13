const MessageContr = require('../db_controllers/MessageContoller');
const UserContr = require('../db_controllers/UserController');

module.exports = {
    getUserReceivers: async (senderID) => {
        const { err, users } = await MessageContr.getUserReceiversByID(senderID);
        let filterArray = [];
        let receivers = [];
        if (!err && users) {            
            users.forEach(element => {
                element = JSON.stringify(element);
                if (filterArray.indexOf(element) === -1) filterArray.push(element);
            });
            for (let i = 0; i < filterArray.length; i++) {
                const { err, user } = await UserContr.getOneByID(JSON.parse(filterArray[i]).receiverID);                          
                if (!err && user) receivers.push(user);
            }
        }
        return receivers;
    }
};