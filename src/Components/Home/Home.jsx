import AuthLogout from '../Auth/AuthLogout.jsx'
import CurrentEvents from './CurrentEvents.jsx'
import './Home.css'
import ChatBox from '../Chat/ChatBox';

function Home() {
    return (
      <section>
        <CurrentEvents />
        <AuthLogout />   
      </section>
    )
}

export default Home
// // in the future, this page would include more information about the classes 
// // perhaps some videos

