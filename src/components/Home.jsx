import {Link} from 'react-router-dom';
import {useAuth} from '../context/Auth.jsx'



export default function Home(){
  const auth = useAuth();


  return (<>
    <section>
      <h1>Home page</h1>
      <p>This is our home page for now.</p>
      {auth.currentUser?(<><h2>{auth.currentUser.displayName}</h2><h2>{auth.currentUser.email}</h2>
      <button onClick={()=>auth.logout()}>logout here </button></>):(<><div>
	<Link to="/signup"> signup here </Link>
	</div>
	<div>
	  <Link to="/login">got account? login here</Link>
	</div></>)}
    </section>
    </>);
}
