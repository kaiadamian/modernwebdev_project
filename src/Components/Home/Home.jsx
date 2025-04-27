<<<<<<< HEAD
import AuthLogout from '../Auth/AuthLogout.jsx'
import CurrentEvents from './CurrentEvents.jsx'
import './Home.css'
import ChatBox from '../Chat/ChatBox';

function Home() {
    return (
      <section>
        <br />
        <ChatBox />
        <CurrentEvents />
        <AuthLogout />   
=======
import Box from '@mui/material/Box';
import NewEvents from './NewEvents.jsx'

function Home() {
    return (
      <section> 
        <NewEvents/>
>>>>>>> a65c6f2b51ec4c6ddb996bfc396462f8d584cd84
      </section>
    )
}

export default Home