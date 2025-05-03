/* NewEvents - Stateful Parent Component for Home Page */
import React, { useEffect, useState } from 'react'
import { Typography, Grid } from '@mui/material'
import { getNewEvents } from '../../Common/Services/EventsService.js'
import EventCard from './EventCard'

const NewEventsPage = () => {
    // hold the list of new events retrieved from the backend
    const [events, setEvents] = useState([])

    // tracks whether events are still being fetched
    const [loading, setLoading] = useState(true)

    // get new events and set loading
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

    // displays a loading message while data is being fetched
    if (loading) {
        return <Typography variant="h6">Loading events...</Typography>
    }

    return (
        // pass the data down to EventCard
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
