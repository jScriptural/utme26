import {useState, useEffect, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/Auth.jsx';
import HeaderAuth from  "../headers/HeaderAuth.jsx";
import {
  validatePassword,
  getAuth,
  onAuthStateChanged } from 'firebase/auth';


export default function Login(){
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [showPasswd, setShowPasswd] = useState(false);
  const formRef = useRef();

  const  {
    currentUser,
    logOut,
    logIn } = useAuth();

  const handleSubmit = async (evt)=>{
    evt.preventDefault();
    const form = formRef.current;
    const password = form.passwordInput.value;
    const email = form.emailInput.value;

    console.log("login paddword: ", password);
    console.log("login email: ", email);
    try {

     await logIn(email,password);

    } catch(error) {
      setError(error.message);
    }
  }

  useEffect(()=>{
    (async ()=>{
      if(currentUser){
	navigate("/main");
      }
    })();

  },[currentUser]);

  return (<>
    <HeaderAuth />
    <section id="login">
      <div className="container">
      <div className="error">{error}</div>
	<form onSubmit={handleSubmit} ref={formRef}>
	  <fieldset>
	    <legend>Log in</legend>
	    <div className="con-email">
	      <label htmlFor="emailInput" hidden>Email</label>
	      <input type="email" id="emailInput" name="emailInput" placeholder="Email" required/>
	    </div>
	    <div className="con-password">
	      <label htmlFor="passwordInput" hidden> Password </label>
	      <input type={showPasswd?"text":"password"}  id="passwordInput" name="password" placeholder="Password" required/>
	    </div>
	    <div className="con-button">
	      <button type="submit" className="btn login-btn"> Log in</button>
	    </div>
	  </fieldset>
	</form>
	<form className="showPasswd">
	  <input type="checkbox" id="checkboxInput" name="showPassword" onChange={(evt)=>setShowPasswd(evt.target.checked)}/>
	  <label htmlFor="checkBoxInput">Show password</label>
	</form>
	<div className="sub-container">
	  <div className="reset-password"> <Link to="/auth/forgot-password"> Forgot password</Link> </div>
	  <div className="link">
	      <span>New user?</span><Link to="/auth/signup" > Sign up </Link> </div>
	</div>
      </div>
    </section>
  </>)
}
