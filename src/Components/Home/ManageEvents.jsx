import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { checkUser } from "../Auth/AuthService";
import Parse from "parse";
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";

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
    const fetchDormsAndEvents = async () => {
      try {
        const Dorm = Parse.Object.extend("Dorm");
        const dormQuery = new Parse.Query(Dorm);
        const dormResults = await dormQuery.find();
        setDorms(dormResults);

        const Event = Parse.Object.extend("Event");
        const eventQuery = new Parse.Query(Event);
        const eventResults = await eventQuery.find();
        setEvents(eventResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDormsAndEvents();
  }, []);

  if (!checkUser()) {
    return <Navigate to="/auth/login" replace />;
  }

  const handleAddEvent = async () => {
    if (!eventName.trim() || !eventDate) {
      alert("Event name and date are required.");
      return;
    }

    try {
      const Event = new Parse.Object("Event");

      Event.set("eventName", eventName);
      Event.set("eventDate", new Date(eventDate));
      Event.set("eventDescription", eventDescription);
      Event.set("creator", Parse.User.current());

      if (eventImage) {
        const parseFile = new Parse.File(eventImage.name, eventImage);
        await parseFile.save();
        Event.set("eventImage", parseFile);
      }

      if (dormId) {
        const Dorm = new Parse.Object("Dorm");
        Dorm.set("objectId", dormId);
        Event.set("dormPointer", Dorm);
      }

      const result = await Event.save();
      console.log("Saved Event:", result);

      if (result && result.id) {
        alert(`Event "${eventName}" added successfully!`);
        setEventName("");
        setEventDescription("");
        setEventDate("");
        setEventImage(null);
        setDormId("");

        // Refresh events list
        const Event = Parse.Object.extend("Event");
        const eventQuery = new Parse.Query(Event);
        const eventResults = await eventQuery.find();
        setEvents(eventResults);
      } else {
        throw new Error("Event save failed — no ID returned.");
      }
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event. Please try again.");
    }
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(true);
  };

  const handleDeleteEvent = async () => {
    setOpenConfirmDialog(false);

    if (!eventToDelete) {
      alert("Please select an event to delete.");
      return;
    }

    try {
      const Event = Parse.Object.extend("Event");
      const query = new Parse.Query(Event);
      const eventToDeleteObject = await query.get(eventToDelete);

      if (eventToDeleteObject) {
        await eventToDeleteObject.destroy();
        alert("Event deleted successfully!");

        // Refresh events list
        const updatedEvents = await new Parse.Query(Event).find();
        setEvents(updatedEvents);
        setEventToDelete("");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event. Please try again.");
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        Manage Events
      </Typography>

      {/* ADD EVENT SECTION */}
      <TextField
        fullWidth
        label="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Event Description"
        value={eventDescription}
        onChange={(e) => setEventDescription(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        type="datetime-local"
        label="Event Date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
        margin="normal"
      />

      <Button
        fullWidth
        variant="contained"
        component="label"
        sx={{ my: 2 }}
      >
        Upload Event Image
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => setEventImage(e.target.files[0])}
        />
      </Button>

      {/* Dorm Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="dorm-select-label">Select Dorm</InputLabel>
        <Select
          labelId="dorm-select-label"
          value={dormId}
          label="Select Dorm"
          onChange={(e) => setDormId(e.target.value)}
        >
          {dorms.map((dorm) => (
            <MenuItem key={dorm.id} value={dorm.id}>
              {dorm.get("dormName") || dorm.id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleAddEvent}
        sx={{ mt: 2 }}
      >
        Add Event
      </Button>

      {/* DELETE EVENT SECTION */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Delete Event
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel id="delete-event-label">Select Event to Delete</InputLabel>
        <Select
          labelId="delete-event-label"
          value={eventToDelete}
          label="Select Event to Delete"
          onChange={(e) => setEventToDelete(e.target.value)}
        >
          {events.map((ev) => (
            <MenuItem key={ev.id} value={ev.id}>
              {ev.get("eventName") || ev.id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        fullWidth
        variant="outlined"
        color="error"
        onClick={handleConfirmDelete}
        disabled={!eventToDelete}
        sx={{ mt: 2 }}
      >
        Delete Selected Event
      </Button>

      {/* alert to confirm you want to delete */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCancelDelete}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this event? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleDeleteEvent} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
