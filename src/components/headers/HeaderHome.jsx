import {Link} from "react-router";
import Centre26Logo from "./Centre26Logo.jsx";

export default function HeaderHome(){


  return (<>
    <nav id="navHome">
      <Centre26Logo className="logo" fill="#c2950a" />
      <ul className="navlinks">
	<li className="signup-link"><Link to="/auth/signup"> sign up </Link></li>
	<li className="login-link"><Link to="/auth/login"> login </Link></li>
      </ul>
    </nav >
    </>)
}
