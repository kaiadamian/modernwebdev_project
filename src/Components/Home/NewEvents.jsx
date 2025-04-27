import React, { useEffect, useState } from 'react'
import { Paper, Typography, Grid, Box, Grow } from '@mui/material'
import { getNewEvents } from '../../Common/Services/NewEventsService.js'
import { useNavigate } from 'react-router-dom'

const NewEvents = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getNewEvents() // fetch events
      .then(fetchedEvents => {
        setEvents(fetchedEvents)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching events:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <Typography variant="h6">Loading events...</Typography>
  }

  return (
    <Grid 
        container 
        spacing={3}
        sx={{
            paddingTop: 2,   
          }}
    >
      {events.length === 0 ? (
        <Typography variant="h6">No events available.</Typography>
      ) : (
        events.map((event, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Grow in={true} timeout={500 * (index + 1)}>
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
                <Typography 
                    variant="body2" 
                    gutterBottom
                    onClick={() => navigate(`/explore?dormName=${encodeURIComponent(event.dormName)}`)}
                    sx={{ 
                        cursor: 'pointer', 
                        textDecoration: 'none', 
                        color: 'info.dark',
                        '&:hover': { textDecoration: 'underline' } 
                    }}
                >
                    {event.dormName} Hall
                </Typography>
              )}
              {/* Display event name */}
              <Typography variant="h5" color="info.dark" gutterBottom>
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
            </Grow>
          </Grid>
        ))
      )}
    </Grid>
  )
}

export default NewEvents
