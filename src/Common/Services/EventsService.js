/* SERVICE FOR PARSE SERVER OPERATIONS ON 'Event' CLASS */
import Parse from 'parse';

/* READ operation - fetch dorm's events from its pointer */
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

/* READ operation - get 6 newest events, as well as retrieve the dorm name of each event for link to explore */
export const getNewEvents = () => {
    const Event = Parse.Object.extend('Event');
    const query = new Parse.Query(Event);

    // order by newest
    query.descending('eventDate');

    // limit to the 6 newest events
    query.limit(6);

    return query.find()
        .then(results => {
            console.log("Newest events fetched successfully:", results);

            // create a new array of promises to fetch dorm names for all events
            const enrichedEvents = results.map(event => {
                const dormPointer = event.get('dormPointer');  // grab the dormPointer of each event
                
                if (dormPointer) {
                    const Dorm = Parse.Object.extend('Dorm');
                    const dormQuery = new Parse.Query(Dorm);
                    
                    return dormQuery.get(dormPointer.id)  // get the dorm using the dormPointer ID
                        .then(dorm => {
                            const dormName = dorm.get('dormName');
                            console.log('Dorm fetched successfully:', dorm);
                            console.log('Dorm Name:', dormName);
                            
                            event.dormName = dormName; // add dorm name to the event object
                            return event; 
                        })
                        .catch(error => {
                            console.error('Error fetching Dorm:', error);
                            event.dormName = "Unknown";  // set a default name if dorm fetching fails
                            return event;
                        });
                } else {
                    event.dormName = "Unknown";  // set a default name if no dormPointer exists
                    return event; 
                }
            });

            return Promise.all(enrichedEvents);
        })
        .then(enrichedEvents => {
            console.log('Enriched Events:', enrichedEvents);  
            return enrichedEvents;  // return the enriched list of events (with their respective dorms)
        })
        .catch(error => {
            console.error("Error fetching events:", error);
            return [];
        });
};

/* CREATE operation - add an event */
export const addEvent = ({ eventName, eventDate, eventDescription, eventImage, dormId }) => {
    const Event = new Parse.Object("Event");

    Event.set("eventName", eventName);
    Event.set("eventDate", new Date(eventDate));
    Event.set("eventDescription", eventDescription);
    Event.set("creator", Parse.User.current());

    const uploadImage = eventImage
        ? new Parse.File(eventImage.name, eventImage).save().then((file) => {
            Event.set("eventImage", file);
        })
        : Promise.resolve();

    const setDormPointer = dormId
        ? (() => {
            const Dorm = new Parse.Object("Dorm");
            Dorm.id = dormId;
            Event.set("dormPointer", Dorm);
        })()
        : null;

    return uploadImage.then(() => Event.save());
};

/* DELETE operation - delete event */
export const deleteEvent = (eventId) => {
    const Event = Parse.Object.extend("Event");
    const query = new Parse.Query(Event);

    return query.get(eventId)
        .then(event => event.destroy())
        .catch(err => {
            console.error("Delete error:", err);
            throw err;
        });
};

/* READ operation - get all events */
export const getAllEvents = () => {
    const Event = Parse.Object.extend('Event');
    const query = new Parse.Query(Event);
    query.ascending('eventDate'); // or descending, based on your needs

    return query.find()
        .then(results => results)
        .catch(error => {
            console.error("Error fetching all events:", error);
            return [];
        });
};