import { useEffect, useState } from 'react'
import { getAllDorms } from '../../Common/Services/ExploreService.js'
import { getEventsByDormId } from '../../Common/Services/DormEventsService.js'
import { findDormByName } from '../../Common/Services/FindDormByNameService.js'
import { Autocomplete, TextField, Grow, Card, Container, CardMedia, CardContent, Typography, Grid, Box, Paper } from '@mui/material'

/* retrieves all dorms and displays them */
const ExploreDropdown = () => {
    const [dorms, setDorms] = useState([])
    const [selectedDorm, setSelectedDorm] = useState(null) 
    const [events, setEvents] = useState([])

    const dormNameFromURL = new URLSearchParams(location.search).get('dormName')

    useEffect(() => {
        getAllDorms()
        .then(fetchedDorms => {
            setDorms(fetchedDorms)
    
            if (dormNameFromURL) {
                const matchedDorm = findDormByName(fetchedDorms, dormNameFromURL)
                if (matchedDorm) {
                    setSelectedDorm(matchedDorm)
    
                    getEventsByDormId(matchedDorm.id)
                        .then(setEvents)
                        .catch((error) => console.error('Error fetching events:', error))
                }
            }
        })
        .catch((error) => console.error('Error fetching dorms:', error))
    }, [dormNameFromURL])

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
            <Paper sx={{ backgroundColor: '#ffffff', padding: 2 }}>
                <Typography variant="h1" color="primary.main">
                    Select a Dorm
                </Typography>
            
                <Autocomplete
                    disablePortal
                    color="primary.main"
                    options={dorms}
                    getOptionLabel={(option) => option.get('dormName') + ' Hall'}
                    sx={{ width: 300, marginTop: 2 }}
                    value={selectedDorm}
                    onChange={handleDormSelection}
                    renderInput={(params) => <TextField {...params} label="Select a Dorm" />}
                />
            </Paper>
        
            {selectedDorm && (
                <Container sx={{ marginTop: 4 }}>
                    <Grow in={true} timeout={500}>
                    <Paper sx={{ backgroundColor: '#ffffff', padding: 3 }}>
                        <Grid container spacing={3} alignItems="center">
                            {/* Left: Logo */}
                            <Grid sx={{ xs: 12, md: 4}}>
                            <Box
                                component="img"
                                src={selectedDorm.get('dormLogo')?.url()}
                                alt={selectedDorm.get('dormName')}
                                sx={{
                                width: '100%',
                                height: 'auto',
                                maxWidth: 250,
                                objectFit: 'cover',
                                margin: '0 auto',
                                display: 'block',
                                }}
                            />
                            </Grid>

                            {/* Right */}
                            <Grid item xs={12} md={8}>
                            <Typography variant="h1" color="primary.main" sx={{ marginBottom: 2 }}>
                                {selectedDorm.get('dormName')} Hall
                            </Typography>
                            <Typography variant="body1" color="primary.main">
                                Check out our events below!
                            </Typography>
                            </Grid>
                        </Grid>
                        </Paper>
                        </Grow>
                </Container>
            )}
                
            {/* Show events */}
            <Grid 
                container 
                spacing={2} 
                sx={{ marginTop: 4 }}
                justifyContent="center"
            >
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
