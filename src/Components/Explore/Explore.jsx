/* Explore Page - Routed Container Component */

import ExploreParent from './ExploreParent.jsx'
import { Container } from '@mui/material'

function Explore() {
    return (
        // render the explore page using MUI components
        <Container sx={{ marginTop: 4 }}>
            <ExploreParent /> 
        </Container>
      )
}

export default Explore