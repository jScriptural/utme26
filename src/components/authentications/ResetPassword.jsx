import {useRef, useState,useEffect} from "react";
import {useAuth} from "../../context/Auth.jsx";
import {Link} from "react-router-dom";
import HeaderAuth from  "../headers/HeaderAuth.jsx";


export default function ResetPassword(){
  const [msg, setMsg] = useState();
  const {sendResetEmail} = useAuth(); 
  const formRef = useRef();

  async function handleSubmit(evt){
    evt.preventDefault();
    const email = formRef.current.emailInput.value;
    console.log(email);
    try {
      await sendResetEmail(email);
      setMsg("Reset email has been sent");
    }catch(error){
      setMsg(error.message);
    }
  }

  return (<>
    <HeaderAuth />
    <section id="resetPassword">
      <div className="container">
	<div className="error">{msg}</div>
	<form ref={formRef} onSubmit={handleSubmit}>
	    <fieldset>
	      <legend>Reset password </legend>
	      <div className="con-email">
		<label htmlFor="emailInput" hidden> Email </label>
		<input type="email" id="emailInput" name="emailInput" placeholder="Email" required/>
	      </div>
	      <div className="con-button">
		<button type="submit" className="btn submit-btn">Send email reset link</button>
	      </div>
	  </fieldset>
	</form>
	<div className="link">
	  <Link to="/auth/login" replace>Proceed to login </Link>
	</div>
      </div>
    </section>
    </>)
}
