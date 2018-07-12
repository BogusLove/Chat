# Chat

##Routes list: Users and Messages;

##Users: ###
1. GET '/users' - return all Users
2. GET '/users/:id' - return one User by id
3. POST '/users' - insert new User
4. PUT '/users/:id' - update User by id
5. DELETE '/users/:id' - delete User by id

##Messages: ###
1. GET '/messages' - return all Messages
2. GET '/messages/:id' - return one Message by id
3. POST '/messages' - insert new Message
4. PUT '/messages/:id' - update Message by id
5. DELETE '/messages/:id' - delete Message by id
6. GET 'messages/:id/receivers/' - return all User, who was in contact with User with id
