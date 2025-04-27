import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';
import { getNewEvents } from '../../Common/Services/NewEventsService.js'; // Make sure to adjust the path to your service

const NewEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch events on component mount
    getNewEvents()
      .then(fetchedEvents => {
        setEvents(fetchedEvents);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Typography variant="h6">Loading events...</Typography>;
  }

  return (
    <Grid 
        container 
        spacing={3}
        sx={{
            paddingLeft: 2,  
            paddingRight: 2, 
            paddingTop: 2,   
          }}
    >
      {events.length === 0 ? (
        <Typography variant="h6">No events available.</Typography>
      ) : (
        events.map((event, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
              {/* Display event image */}
              {event.get('eventImage') && (
                <Box
                  component="img"
                  src={event.get('eventImage').url()}
                  alt={event.get('eventName')}
                  sx={{ width: '100%', height: 200, objectFit: 'cover', marginBottom: 2 }}
                />
              )}
              {/* Display dorm name */}
              {event.dormName && (
                <Typography variant="body2" gutterBottom>
                    {event.dormName} Hall
                </Typography>
              )}
              {/* Display event name */}
              <Typography variant="h5" gutterBottom>
                {event.get('eventName')}
              </Typography>
              {/* Display event date */}
              <Typography variant="body2" gutterBottom>
                {new Date(event.get('eventDate'))
                    .toLocaleString(
                        'en-US', {
                        year: 'numeric', // "2025"
                        month: 'long', // "April"
                        day: 'numeric' // "26"
                        })}
              </Typography>
              {/* Display event description */}
              <Typography variant="body1">{event.get('eventDescription')}</Typography>
            </Paper>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default NewEvents;
