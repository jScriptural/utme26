import {useAuth} from "../../context/Auth.jsx";
import {Link} from "react-router";

export default function Profile(){
  const {currentUser,logOut}  = useAuth();

  return (
    <section id="profile">
      <div className="container">
	<figure className="user-icon">
	  <i className="fa-solid fa-user"></i>
	</figure>
	<ul className="profile-items">
	  <li><span>User name:</span> {currentUser.displayName}</li>
	  <li><span>Email:</span>  {currentUser.email}</li>
	</ul>

	<button className="logout" onClick={logOut}>
	  <i className="fa fa-sign-out"></i> log out
	</button>
      </div>
    </section>
  )
}
