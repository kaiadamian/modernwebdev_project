import Parse from 'parse';

export const getEventsByDormId = (dormId) => {
    const Event = Parse.Object.extend('Event');
    const query = new Parse.Query(Event);

    query.equalTo('dormPointer', {
        __type: 'Pointer',
        className: 'Dorm',
        objectId: dormId,
    });

    query.descending('eventDate');
    query.limit(6);

    return query.find()
        .then(events => {
            return events.map(event => ({
                id: event.id,
                eventName: event.get('eventName'),
                eventDescription: event.get('eventDescription'),
                eventDate: event.get('eventDate'),
                eventImage: event.get('eventImage') ? event.get('eventImage').url() : null,
            }));
        })
        .catch(error => {
            console.error('Error fetching events for dorm:', error);
            return [];
        });
};
