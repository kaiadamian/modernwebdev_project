/* ManageEventsForm - Stateless Child Component for Manage Page  */
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
  
  export default function ManageEventsForm({
    eventName,
    setEventName,
    eventDescription,
    setEventDescription,
    eventDate,
    setEventDate,
    eventImage,
    setEventImage,
    dormId,
    setDormId,
    dorms,
    events,
    eventToDelete,
    setEventToDelete,
    openConfirmDialog,
    setOpenConfirmDialog,
    handleAddEvent,
    handleDeleteEvent,
  }) {
    const handleConfirmDelete = () => {
      setOpenConfirmDialog(true);
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
            onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                setEventImage(file);
                alert(`Added selected file: ${file.name}`);
            }
            }}
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
  
