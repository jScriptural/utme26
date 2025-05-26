import {useState, useEffect, useRef} from 'react';
import {validatePassword,getAuth} from 'firebase/auth';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/Auth.jsx';


export default function Signup(){
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
    const displayName = email.split("@")[0];


    const status = await validatePassword(getAuth(), password);

    if(!status.isValid){
      console.log(status);
      setErrorMsg("Weak password");
      return;
    }


    //console.log("status: ",status);
    console.log("signup passwd: ",password);
    //console.log("email: ",email);
    await auth.signup(email,password,displayName);

    if(auth.errCode)
      setErrorMsg(auth.errMsg);

  }

  useEffect(()=>{
    (async ()=>{
      if(!auth.loading){
	console.log("signup loading: ", auth.loading);
	console.log("signup currUser: ",auth.currentUser);
	await auth.logout();
	navigate("/login");
      }
    })();
  },[auth.loading])

  return (<>
    <h1>{auth.loading?"true":"false"}</h1>
    <section id="signup">
      <div className="container" >
      <div className="errormsg">{errorMsg}</div>
	<form onSubmit={handleSubmit} ref={formRef}>
	  <fieldset>
	    <legend>SIGNUP</legend>
	    <div className="con-email">
	      <label htmlFor="emailInput">Email</label>
	      <input type="email" id="emailInput" name="emailInput" placeholder="example@email.com"/>
	    </div>
	    <div className="con-password">
	      <label htmlFor="passwordInput"> Password </label>
	      <input type={showPasswd?"text":"password"} id="passwordInput" name="password"/>
	    </div>
	    <div className="con-button">
	      <button type="submit" className="btn signup-btn"> Signup </button>
	    </div>
	  </fieldset>
	</form>
	<form id="showPasswd">
	  <input type="checkbox" id="checkboxInput" name="showPassword" onChange={(evt)=>setShowPasswd(evt.target.checked)}/>
	  <label htmlFor="checkBoxInput">Show password</label>
	</form>
      </div>
    </section>
  </>)
}
