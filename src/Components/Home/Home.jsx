import NewEvents from './NewEvents.jsx'
import { Box, Container, Typography } from '@mui/material'

function Home() {
    return (
        <Container sx={{ marginTop: 4 }}>
            <Typography variant="h1" color="primary.main">
                Dorm Life
            </Typography>
            <Typography variant="body1" color="primary.main">
                Dorm Life
            </Typography>
            <NewEvents/>
        </Container>
    )
}

export default Home