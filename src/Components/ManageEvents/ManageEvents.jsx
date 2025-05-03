/* ManageEvents - Stateful Parent Component for Manage Page */
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { checkUser } from "../Auth/AuthService";
import {
  getAllEvents,
  addEvent,
  deleteEvent,
} from "../../Common/Services/EventsService";
import { getAllDorms } from "../../Common/Services/DormsService";
import ManageEventsForm from "./ManageEventsForm"; // 👈 child component

export default function ManageEvents() {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [dormId, setDormId] = useState("");
  const [dorms, setDorms] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventToDelete, setEventToDelete] = useState("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  useEffect(() => {
    getAllDorms().then(setDorms);
    getAllEvents().then(setEvents);
  }, []);

  if (!checkUser()) {
    return <Navigate to="/auth/login" replace />;
  }

  const handleAddEvent = () => {
    if (!eventName.trim() || !eventDate) {
      alert("Event name and date and time are required.");
      return;
    }

    addEvent({ eventName, eventDescription, eventDate, eventImage, dormId })
      .then(() => {
        alert(`Event "${eventName}" added successfully!`);
        setEventName("");
        setEventDescription("");
        setEventDate("");
        setEventImage(null);
        setDormId("");
        return getAllEvents();
      })
      .then(setEvents)
      .catch((error) => {
        console.error("Error adding event:", error);
        alert("Failed to add event. Please try again. Make sure image is valid form (png)!");
      });
  };

  const handleDeleteEvent = () => {
    setOpenConfirmDialog(false);
    if (!eventToDelete) {
      alert("Please select an event to delete.");
      return;
    }

    deleteEvent(eventToDelete)
      .then(() => {
        alert("Event deleted successfully!");
        setEventToDelete("");
        return getAllEvents();
      })
      .then(setEvents)
      .catch((error) => {
        console.error("Error deleting event:", error);
        alert("Failed to delete event. Please try again.");
      });
  };

  return (
    <ManageEventsForm
      eventName={eventName}
      setEventName={setEventName}
      eventDescription={eventDescription}
      setEventDescription={setEventDescription}
      eventDate={eventDate}
      setEventDate={setEventDate}
      eventImage={eventImage}
      setEventImage={setEventImage}
      dormId={dormId}
      setDormId={setDormId}
      dorms={dorms}
      events={events}
      eventToDelete={eventToDelete}
      setEventToDelete={setEventToDelete}
      openConfirmDialog={openConfirmDialog}
      setOpenConfirmDialog={setOpenConfirmDialog}
      handleAddEvent={handleAddEvent}
      handleDeleteEvent={handleDeleteEvent}
    />
  );
}
