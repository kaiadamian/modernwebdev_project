import AuthenticateSignUp from './AuthenticateSignUp.jsx'
import './Authenticate.css'

function Authenticate() {
    return (
      <section>
        <h1>Welcome to the Authentication component</h1> 
        <AuthenticateSignUp />
      </section>
    )
}
// in the future, these classes would not have garbage values 

export default Authenticate