/* ExploreDropdown - Stateless Child Component for Explore Page */
import {
    Autocomplete,
    TextField,
    Grow,
    Card,
    Container,
    CardMedia,
    CardContent,
    Typography,
    Grid,
    Box,
    Paper,
  } from '@mui/material'
  
const ExploreDropdown = ({ dorms, selectedDorm, events, onDormSelect }) => (
    // display the explore dropdown and the selected dorm's information and events
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
          onChange={onDormSelect}
          renderInput={(params) => <TextField {...params} label="Select a Dorm" />}
        />
      </Paper>
  
      {selectedDorm && (
        <Container sx={{ marginTop: 4 }}>
          <Grow in={true} timeout={500}>
            <Paper sx={{ backgroundColor: '#ffffff', padding: 3 }}>
              <Grid container spacing={3} alignItems="center">
                <Grid sx={{ xs: 12, md: 4, display: 'flex', justifyContent: 'center' }}>
                  <Box
                    component="img"
                    src={selectedDorm.get('dormLogo')?.url()}
                    alt={selectedDorm.get('dormName')}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      maxWidth: 250,
                      objectFit: 'cover',
                    }}
                  />
                </Grid>
  
                <Grid sx={{ xs: 12, md: 8 }}>
                  <Typography variant="h1" color="primary.main" sx={{ marginBottom: 2 }}>
                    {selectedDorm.get('dormName')} Hall
                  </Typography>
                  <Typography variant="body1" color="primary.main">
                    {selectedDorm.get('dormName')} Hall was founded in {selectedDorm.get('yearFounded')}. 
                    Located on {selectedDorm.get('dormLocation')}, it is home to {selectedDorm.get('dormCapacity')} {selectedDorm.get('dormSex')}.
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grow>
          <Grow in={true} timeout={500}>
            <Paper sx={{ backgroundColor: '#ffffff', padding: 2, marginTop: 2 }}>
              <Typography variant="h3" color="primary.main">
                Check out our events below!
              </Typography>
            </Paper>
          </Grow>
        </Container>
      )}
  
      <Grid container spacing={2} sx={{ marginTop: 4 }} justifyContent="center">
        {events.map((event, index) => (
          <Grow in={true} timeout={(index + 1) * 300} key={event.id}>
            <Grid sx={{ xs: 12, sm: 6, md: 4 }}>
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
  
export default ExploreDropdown
  
