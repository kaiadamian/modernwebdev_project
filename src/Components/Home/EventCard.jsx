/* EventCard - Stateless Child Component for Home Page */
import React from 'react'
import { Paper, Typography, Grid, Box, Grow } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const EventCard = ({ event, index }) => {
  const navigate = useNavigate()

  return (
    <Grid size={{xs: 12, sm: 6, md: 4}}>
      <Grow in={true} timeout={500 * (index + 1)}>
        <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
          {/* Event Image */}
          {event.get('eventImage') && (
            <Box
              component="img"
              src={
                typeof event.get('eventImage') === 'string'
                  ? event.get('eventImage')
                  : event.get('eventImage')?.url()
              }
              alt={event.get('eventName')}
              sx={{
                width: '100%',
                height: 200,
                objectFit: 'cover',
                marginBottom: 2,
              }}
            />
          )}

          {/* Dorm Name */}
          {event.dormName && (
            <Typography
              variant="body2"
              gutterBottom
              onClick={() =>
                navigate(`/explore?dormName=${encodeURIComponent(event.dormName)}`)
              }
              sx={{
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'info.dark',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {event.dormName} Hall
            </Typography>
          )}

          {/* Event Name */}
          <Typography variant="h5" color="info.dark" gutterBottom>
            {event.get('eventName')}
          </Typography>

          {/* Event Date */}
          <Typography variant="body2" gutterBottom>
            {new Date(event.get('eventDate')).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Typography>

          {/* Description */}
          <Typography variant="body1">{event.get('eventDescription')}</Typography>
        </Paper>
      </Grow>
    </Grid>
  )
}

export default EventCard
