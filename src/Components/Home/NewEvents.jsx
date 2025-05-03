/* NewEvents - Stateful Parent Component for Home Page */
import React, { useEffect, useState } from 'react'
import { Typography, Grid } from '@mui/material'
import { getNewEvents } from '../../Common/Services/EventsService.js'
import EventCard from './EventCard'

const NewEventsPage = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getNewEvents()
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
    <Grid container spacing={3} sx={{ paddingTop: 2 }}>
      {events.length === 0 ? (
        <Typography variant="h6">No events available.</Typography>
      ) : (
        events.map((event, index) => (
          <EventCard key={index} event={event} index={index} />
        ))
      )}
    </Grid>
  )
}

export default NewEventsPage
