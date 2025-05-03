/* SERVICE FOR PARSE SERVER OPERATIONS ON 'Message' CLASS */
import Parse from 'parse';

/* READ operation - get the admin user by username */
export const getAdminUser = () => {
    const userQuery = new Parse.Query(Parse.User);
    userQuery.equalTo('username', 'admin@nd.edu');
    return userQuery.first();
};

/* READ operation - fetch messages between current user and admin */
export const fetchMessagesForCurrentUser = () => {
    const currentUser = Parse.User.current();
    if (!currentUser) return Promise.resolve([]);

    return getAdminUser().then((adminUser) => {
        const Message = Parse.Object.extend('Message');

        const sentByUser = new Parse.Query(Message);
        sentByUser.equalTo('sender', currentUser);
        sentByUser.equalTo('receiver', adminUser);

        const sentByAdmin = new Parse.Query(Message);
        sentByAdmin.equalTo('sender', adminUser);
        sentByAdmin.equalTo('receiver', currentUser);

        const combinedQuery = Parse.Query.or(sentByUser, sentByAdmin);
        combinedQuery.ascending('createdAt');

        return combinedQuery.find();
    });
};

/* CREATE operation - send a message from the current user to admin */
export const sendMessageToAdmin = (text) => {
    const currentUser = Parse.User.current();
    if (!currentUser) return Promise.reject("No current user");

    return getAdminUser().then((adminUser) => {
        const Message = Parse.Object.extend('Message');
        const message = new Message();

        message.set('text', text);
        message.set('sender', currentUser);
        message.set('receiver', adminUser);

        return message.save();
    });
};
