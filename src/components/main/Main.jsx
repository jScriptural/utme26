import {useAuth} from "../../context/Auth.jsx";


export default function Main(){
  const {currentUser, logOut} = useAuth();
  return (<>
    <section>
      <h1> Main page </h1>
      <p>username: {currentUser.displayName}</p>
      <p>email: {currentUser.email}</p>
      <p>isVerified: {currentUser.emailVerified?"true":"false"}</p>
      <p>uid: {currentUser.uid}</p>
      <div>
	<button onClick={logOut}>Logout here </button>
      </div>
    </section>
    </>)
}
