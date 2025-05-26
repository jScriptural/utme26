import {useState, useEffect, useRef} from 'react';
import {validatePassword,getAuth, onAuthStateChanged} from 'firebase/auth';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/Auth.jsx';


export default function Login(){
  const [errorMsg, setErrorMsg] = useState('');
  const [showPasswd, setShowPasswd] = useState(false);
  const  auth  = useAuth();
  const formRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (evt)=>{
    evt.preventDefault();
    const form = formRef.current;
    const password = form.passwordInput.value;
    const email = form.emailInput.value;

    console.log("login paddword: ", password);
    console.log("login email: ", email);

     await auth.login(email,password);

    if(auth.errCode){
      setErrorMsg(auth.errMsg);
    }
  }


  useEffect(()=>{
    (async ()=>{
      if(!auth.loading){
	console.log("auth.loading: ",auth.loading);
	/*if(auth.currentUser.emailVerified){
	  console.log("verified user");
	  navigate("/");
	}else {
	  await auth.logout();
	  console.log("unverified user");
	  setErrorMsg("Unverified email: please verify your email");
	}*/
	navigate("/");
      }
    })();

  },[auth.loading])

  return (<>

    <section id="login">
      <div className="container">
      <div className="errormsg">{errorMsg}</div>
	<form onSubmit={handleSubmit} ref={formRef}>
	  <fieldset>
	    <legend>LOGIN</legend>
	    <div className="con-email">
	      <label htmlFor="emailInput">Email</label>
	      <input type="email" id="emailInput" name="emailInput" placeholder="example@email.com"/>
	    </div>
	    <div className="con-password">
	      <label htmlFor="passwordInput"> Password </label>
	      <input type={showPasswd?"text":"password"}  id="passwordInput" name="password"/>
	    </div>
	    <div className="con-button">
	      <button type="submit" className="btn login-btn"> Login </button>
	    </div>
	  </fieldset>
	</form>
	<form id="showPasswd">
	  <input type="checkbox" id="checkboxInput" name="showPassword" onChange={(evt)=>setShowPasswd(evt.target.checked)}/>
	  <label htmlFor="checkBoxInput">Show password</label>
	</form>
	<div className="sub-container">
	  <div className="reset-password"> forgotten password </div>
	  <div className="sign"><Link to="/signup" >New user? sign up here</Link> </div>
	</div>
      </div>
    </section>
  </>)
}
