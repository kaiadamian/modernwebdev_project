import NewEvents from './NewEvents.jsx'
import { Box, Container, Typography, Paper, Divider } from '@mui/material'

function Home() {
    return (
        <Container sx={{ marginTop: 4 }}>
            <Paper sx={{ backgroundColor: 'primary.main', padding: 2 }}>
                <Typography variant="h1" color="white">
                    Dorm Life
                </Typography>
                <Typography variant="body1" color="white">
                    Experience the best of dorm living!
                </Typography>
            </Paper>
            <NewEvents/>
        </Container>
    )
}

export default Home
