import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { checkUser } from "../Auth/AuthService";
import {
  getAllEvents,
  addEvent,
  deleteEvent,
} from "../../Common/Services/EventsService";
import { getAllDorms } from '../../Common/Services/DormsService';
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
  DialogTitle,
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
    getAllDorms().then(setDorms);
    getAllEvents().then(setEvents);
  }, []);

  if (!checkUser()) {
    return <Navigate to="/auth/login" replace />;
  }

  const handleAddEvent = () => {
    if (!eventName.trim() || !eventDate) {
      alert("Event name and date are required.");
      return;
    }

    addEvent({ eventName, eventDescription, eventDate, eventImage, dormId })
      .then((result) => {
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
        alert("Failed to add event. Please try again.");
      });
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(true);
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

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "white",
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Manage Events
      </Typography>

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
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
        margin="normal"
      />

      <Button fullWidth variant="contained" component="label" sx={{ my: 2 }}>
        Upload Event Image
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => setEventImage(e.target.files[0])}
        />
      </Button>

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

      <Dialog open={openConfirmDialog} onClose={handleCancelDelete}>
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
