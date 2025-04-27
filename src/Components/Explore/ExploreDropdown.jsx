import { useEffect, useState } from 'react'
import { getAllDorms } from '../../Common/Services/ExploreService.js'
import { getEventsByDormId } from '../../Common/Services/DormEventsService.js'
import { Autocomplete, TextField, Grow, Card, Container, CardMedia, CardContent, Typography, Grid } from '@mui/material'

/* retrieves all dorms and displays them */
const ExploreDropdown = () => {
    const [dorms, setDorms] = useState([])
    const [selectedDorm, setSelectedDorm] = useState(null) 
    const [events, setEvents] = useState([])

    useEffect(() => {
        getAllDorms()
        .then(setDorms)
        .catch((error) => console.error('Error fetching dorms:', error))
    }, [])

    const handleDormSelection = (event, newValue) => {
        setSelectedDorm(newValue)

        if (newValue) {
            getEventsByDormId(newValue.id)
            .then(setEvents)
            .catch((error) => console.error('Error fetching events:', error))
        } else {
            setEvents([])
        }
    }
    
    return (
        <Container sx={{ marginTop: 4 }}>
          <h2>Select a Dorm</h2>
      
          <Autocomplete
            disablePortal
            options={dorms}
            getOptionLabel={(option) => option.get('dormName') + ' Hall'}
            sx={{ width: 300 }}
            value={selectedDorm}
            onChange={handleDormSelection}
            renderInput={(params) => <TextField {...params} label="Select a Dorm" />}
          />
      
          {/* Show events */}
          <Grid container spacing={2} sx={{ marginTop: 4 }}>
            {events.map((event, index) => (
              <Grow in={true} timeout={(index + 1) * 300} key={event.id}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ width: 300, height: 300, display: 'flex', flexDirection: 'column' }}>
                    {event.eventImage && (
                      <CardMedia
                        component="img"
                        height="140"
                        image={event.eventImage}
                        alt={event.eventName}
                      />
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="div" noWrap>
                        {event.eventName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block" marginTop={1}>
                        {new Date(event.eventDate).toLocaleDateString()}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {event.eventDescription}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grow>
            ))}
          </Grid>
        </Container>
      )
}

export default ExploreDropdown
