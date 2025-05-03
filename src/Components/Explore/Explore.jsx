/* Explore Page - Routed Container Component */

import ExploreParent from './ExploreParent.jsx'
import { Container } from '@mui/material'

function Explore() {
    return (
        <Container sx={{ marginTop: 4 }}>
            <ExploreParent /> 
        </Container>
      )
}

export default Explore