import Parse from "parse";

export function fetchAllEvents() {
  const Event = Parse.Object.extend("Event");
  const query = new Parse.Query(Event);
  return query.find();
}

export function addEvent({ eventName, eventDescription, eventDate, eventImage, dormId }) {
  const Event = new Parse.Object("Event");

  Event.set("eventName", eventName);
  Event.set("eventDate", new Date(eventDate));
  Event.set("eventDescription", eventDescription);
  Event.set("creator", Parse.User.current());

  const promises = [];

  if (eventImage) {
    const parseFile = new Parse.File(eventImage.name, eventImage);
    promises.push(parseFile.save().then(file => Event.set("eventImage", file)));
  }

  if (dormId) {
    const Dorm = new Parse.Object("Dorm");
    Dorm.set("objectId", dormId);
    Event.set("dormPointer", Dorm);
  }

  return Promise.all(promises).then(() => Event.save());
}

export function deleteEvent(eventId) {
  const Event = Parse.Object.extend("Event");
  const query = new Parse.Query(Event);
  return query.get(eventId).then(event => event.destroy());
}
