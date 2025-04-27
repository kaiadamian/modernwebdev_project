import ExploreDropdown from './ExploreDropdown.jsx'
import { Container } from '@mui/material'

function Explore() {
    return (
        <Container sx={{ marginTop: 4 }}>
            <h1>Explore</h1>
            <ExploreDropdown /> 
        </Container>
      )
}

export default Explore

/* in the future, this page will have more features and ways for the user to interact */