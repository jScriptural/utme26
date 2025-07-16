"use strict"
import {useState, useEffect, useRef} from 'react';
import {validatePassword,getAuth} from 'firebase/auth';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/Auth.jsx';
import HeaderAuth from  "../headers/HeaderAuth.jsx";

function validateEmail(email){
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateDisplayName(userName){
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(userName);
}


export default function Signup(){
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [showPasswd, setShowPasswd] = useState(false);
  const [displayName, setDisplayName] = useState();

  const formRef = useRef();
  const navigate = useNavigate();

  const  {
    signUp,
    canUpdate,
    currentUser,
    verifyEmail,
    setProfile,
    logOut } = useAuth();

  const handleSubmit = async (evt)=>{
    //prevent page refresh on submit
    evt.preventDefault();
    setLoading(true);

    const form = formRef.current;
    const password = form.passwordInput.value;
    const email = form.emailInput.value;
    const displayName = form.userNameInput.value;


    try {
      if(!validateDisplayName(displayName))
	throw new Error(`Name can contain only alphanumeric characters`);

      setDisplayName(displayName)

      if(!validateEmail(email))
	throw new Error("Please provide a valid email");

      const stat = await validatePassword(getAuth(), password);
      if(!stat.isvalid){
	if(!stat.containsLowercaseLetter)
	  throw new Error(`Password must contain a  lowercase letter`);
	else if(!stat.containsNumericCharacter)
	  throw new Error(`Password must contain numeric character`);
	else if(!stat.containsNonAlphanumericCharacter)
	  throw new Error(`Password must contain a non-alphanumeric character such as "^$*.[]{}()?\\"!@#%&/,><':;|_~\`-"`);
	else if(!stat.containsUppercaseLetter)
	  throw new Error(`Password must contain an uppercase letter`);
	else if(!stat.meetsMaxPasswordLength)
	  throw new Error(`Password length must be less than 4096`);
	else if(!stat.meetsMinPasswordLength)
	  throw new Error(`Password must be at least 8 characters long`);

      }
      const userCredential = await signUp(email,password);
    } catch(error){
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(()=>{
    (async ()=>{
      if(canUpdate){
      //if currentUser is defined,
	//set display name.
	try {
	  await setProfile({displayName});
	}catch(error){
	  setError(error.message);
	}
	//Redirect to login.
	await logOut();
	setLoading(false);
	navigate("/auth/login");
      }
    })();
  },[canUpdate])

  return (<>
    <HeaderAuth />
    <section id="signup">
      <div className="container" >
      <div className="error">{error}</div>
	<form onSubmit={handleSubmit} ref={formRef}>
	  <fieldset>
	    <legend>Create account</legend>
	    <div className="con-username">
	      <label htmlFor="userNameInput" hidden>First Name</label>
	      <input type="text" id="userNameInput" name="userName" placeholder="First Name" required />
	    </div>
	    <div className="con-email">
	      <label htmlFor="emailInput" hidden>Email</label>
	      <input type="email" id="emailInput" name="emailInput" placeholder="Email" required />
	    </div>
	    <div className="con-password">
	      <label htmlFor="passwordInput" hidden> Password </label>
	      <input type={showPasswd?"text":"password"} id="passwordInput" name="password" placeholder="Password" required/>
	    </div>
	    <div className="con-button">
	      <button type="submit" className="btn signup-btn" disabled={loading}>{loading?<i className="fa fa-spinner fa-spin"></i>:"Create account"}</button>
	    </div>
	  </fieldset>
	</form>
	<form className="showPasswd">
	  <input type="checkbox" id="checkboxInput" name="showPassword" onChange={(evt)=>setShowPasswd(evt.target.checked)}/>
	  <label htmlFor="checkBoxInput">Show password</label>
	</form>
	<div className="link">
	 <span>Already have an account?</span> <Link to="/auth/login"> Login </Link>
	</div>
      </div>
    </section>
  </>)
}
