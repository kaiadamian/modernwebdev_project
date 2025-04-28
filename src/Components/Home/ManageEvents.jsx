import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { checkUser } from "../Auth/AuthService";
import Parse from "parse";
import { TextField, Button, Box, Typography, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

export default function ManageEvents() {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [dormId, setDormId] = useState("");
  const [dorms, setDorms] = useState([]);

  // 🔥 New: Fetch all Dorms on load
  useEffect(() => {
    const fetchDorms = async () => {
      const Dorm = Parse.Object.extend("Dorm");
      const query = new Parse.Query(Dorm);
      const results = await query.find();
      setDorms(results);
    };

    fetchDorms();
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
        setEventImage(null);
        setDormId("");
      } else {
        alert(`No event found with the name "${eventName}".`);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event. Please try again.");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
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
        label="Event Date"
        InputLabelProps={{ shrink: true }}
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

      {/* 🔥 Dorm Pointer Dropdown */}
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

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button variant="contained" color="primary" onClick={handleAddEvent}>
          Add Event
        </Button>
        <Button variant="outlined" color="error" onClick={handleDeleteEvent}>
          Delete Event
        </Button>
      </Box>
    </Box>
  );
}
