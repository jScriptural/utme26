import {Link} from "react-router";
import Centre26Logo from "./Centre26Logo.jsx";

export default function HeaderMain({setShowProfile}){

  const handleBtnClick = evt => {
    evt.preventDefault();
    setShowProfile(val=>val?false:true);
  }
  return (<>
    <nav id="navMain">
      <Centre26Logo className="logo"/>
      <button className="user-icon" onClick={handleBtnClick}>
	<i className="fa-solid fa-user"></i>
      </button>
    </nav >
    </>)
}
