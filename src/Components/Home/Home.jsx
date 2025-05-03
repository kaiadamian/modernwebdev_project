/* Home Page - Routed Container Component */
import NewEvents from './NewEvents.jsx'
import { Box, Container, Typography, Paper, Divider, Grow } from '@mui/material'

function Home() {
    return (
        <Container sx={{ marginTop: 4 }}>
            {/* display reslife info on mui paper elements */}
            <Grow in={true} timeout={500}>
            <Paper sx={{ backgroundColor: 'white', padding: 2 }}>
                <Typography variant="h1" color="primary.main">
                    Residential Life
                </Typography>
                <Typography variant="body1" color="primary.main" sx={{ marginTop: 1 }}>
                    Inspired by visionaries like Blessed Basil Moreau, C.S.C., who grounded a Holy Cross education in the formation of the whole person through the concurrent development of the mind and heart, residential life is one of the most distinctive features of a Notre Dame undergraduate experience and unlike any other in American higher education.
                    At Notre Dame, residential life is designed to form undergraduate communities that are inclusive of all members; dedicated to the intellectual, moral, and spiritual development of each individual; and characterized by a collective sense of care and concern for the common good and service to others. 
                    Residential Life also offers several housing options to graduate students to assist in sustaining their quality of life outside the classroom and to summer guests to aid in their visit to campus.
                </Typography>
                <Typography variant="body1" color="primary.main" sx={{ fontStyle: 'italic', marginTop: 1 }}>
                    From https://residentiallife.nd.edu/
                </Typography>
                <Typography variant="body1" color="primary.main" sx={{ marginTop: 1 }}>
                    Each year, all the dorms host signature events, from comedy revues to talent shows. 
                    These events are crucial to building culture and community not only within halls but also throughout the entire campus community.
                    That's why this website was created — to help you easily discover and join in on all the exciting dorm events happening across campus!
                </Typography>
            </Paper>
            </Grow>
            <Grow in={true} timeout={500}>
            <Paper sx={{ backgroundColor: 'white', padding: 2, marginTop: 2 }}>
                <Typography variant="h3" color="primary.main">
                        Stay up-to-date with the newest events below:
                    </Typography>
            </Paper>
            </Grow>
            {/* display newest events */}
            <NewEvents/>
        </Container>
    )
}

export default Home
