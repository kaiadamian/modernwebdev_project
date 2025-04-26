import AuthLogout from '../Auth/AuthLogout.jsx'
import CurrentEvents from './CurrentEvents.jsx'
import './Home.css'
import ChatBox from '../Chat/ChatBox';
import Box from '@mui/material/Box';

function Home() {
    return (
      <section>
        <Box 
            sx={{
                paddingTop: {
                xs: '41px',   // extra-small devices
                sm: '49px',   // small devices
                md: '75px',   // medium and up
                },
            }}
        >
            <CurrentEvents />
        </Box>
        <AuthLogout />   
      </section>
    )
}

export default Home
// // in the future, this page would include more information about the classes 
// // perhaps some videos

