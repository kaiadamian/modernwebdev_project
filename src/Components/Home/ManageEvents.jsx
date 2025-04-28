import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkUser } from "./AuthService";
import Parse from "parse";

export default function ManageEvents() {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [dormId, setDormId] = useState("");

  if (!checkUser()) {
    navigate("/auth/login");
    return null;
  }

  const handleAddEvent = async () => {
    if (!eventName.trim() || !eventDate) {
      alert("Event name and date are required.");
      return;
    }
  
    try {
      const Event = new Parse.Object("DormEvent");
  
      Event.set("eventName", eventName);
      Event.set("eventDate", new Date(eventDate));
      Event.set("eventDescription", eventDescription);
      Event.set("creator", Parse.User.current());
  
      if (eventImage) {
        const parseFile = new Parse.File(eventImage.name, eventImage);
        await parseFile.save();
        Event.set("eventImage", parseFile);
      }
  
      if (dormId.trim()) {
        const Dorm = new Parse.Object("Dorm");
        Dorm.set("objectId", dormId);
        Event.set("dormPointer", Dorm);
      }
  
      await Event.save();
      alert(`Event "${eventName}" added successfully!`);
      setEventName("");
      setEventDescription("");
      setEventDate("");
      setEventImage(null);
      setDormId("");
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event. Please try again.");
    }
  };
  

  const handleDeleteEvent = async () => {
    if (!eventName.trim()) {
      alert("Please enter the event name to delete.");
      return;
    }

    try {
      const query = new Parse.Query("DormEvent");
      query.equalTo("eventName", eventName);
      const eventToDelete = await query.first();

      if (eventToDelete) {
        await eventToDelete.destroy();
        alert(`Event "${eventName}" deleted successfully!`);
        setEventName("");
        setEventDescription("");
        setEventDate("");
      } else {
        alert(`No event found with the name "${eventName}".`);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event. Please try again.");
    }
  };

  return (
    <div>
      <h2>Manage Events</h2>
      <input
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Event Description (optional)"
        value={eventDescription}
        onChange={(e) => setEventDescription(e.target.value)}
      />
      <input
        type="datetime-local"
        placeholder="Event Date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setEventImage(e.target.files[0])}
      />
      <input
        type="text"
        placeholder="Dorm ObjectId (optional)"
        value={dormId}
        onChange={(e) => setDormId(e.target.value)}
      />
      <button onClick={handleAddEvent}>Add Event</button>
      <button onClick={handleDeleteEvent}>Delete Event</button>
    </div>
  );
}
