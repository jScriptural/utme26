import {Link} from 'react-router-dom';
import Alert from "./Alert.jsx"
import HeaderHome from "./headers/HeaderHome.jsx";

export default function Home(){
  const msg = `This platform is freely accessible to schools and the public. Your generous support helps us provide high-quality educational resources at no cost. Please consider donating to:
Account Name: John Isonguyo,Account Number: 5348080115, Bank: Moniepoint: 
Thank you for supporting our mission!
— 300plus Team`;
  return (<>
    <HeaderHome />
    <section id="home">
      <p><strong>Yes!! It's absolutely  FREE</strong><br/>	
    By simulating UTME with actual past 
    questions, <strong>300plus</strong> aim to build aspirant's confidence and familiarity with the exam format.<br/>
    <strong>300plus</strong> provide a free platform for aspirants to test the level of their readiness for the main exam.<br/> While we are facing some challenges like  sourcing for past questions and  maintaining the app, your support  can help offset the cost and keep this app free.
    </p>
      <Alert title="Support Us" message={msg} />
      <ul  className="links">
	<li><Link to="/auth/signup">Create an account</Link></li>
	<li>Got an account?<Link to="/auth/login"> Login</Link></li>
      </ul>
    </section>
    </>);
}
