import {useState, useEffect, useRef} from 'react';
import {validatePassword,getAuth} from 'firebase/auth';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/Auth.jsx';
import HeaderAuth from  "../headers/HeaderAuth.jsx";

function validateEmail(email){
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


export default function Signup(){
  const [error, setError] = useState();
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

    const form = formRef.current;
    const password = form.passwordInput.value;
    const email = form.emailInput.value;
    setDisplayName(form.userNameInput.value);

    if(!validateEmail(email))
      return setError("Please provide a valid email");

    try {
      const status = await validatePassword(getAuth(), password);
      console.log("status");
      const userCredential = await signUp(email,password);
    } catch(error){
      setError(error.message);
    }
  }

  console.log(displayName);
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
	      <button type="submit" className="btn signup-btn"> Create account </button>
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
