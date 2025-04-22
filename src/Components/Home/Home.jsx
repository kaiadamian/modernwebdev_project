import AuthLogout from '../Auth/AuthLogout.jsx'
import './Home.css'
import ChatBox from '../Chat/ChatBox';

function Home() {
    return (
      <section>
        <div className="mats"></div>   
        <br />
        <ChatBox />
        <AuthLogout /> 
      </section>
    )
}

export default Home
// // in the future, this page would include more information about the classes 
// // perhaps some videos