import {Link} from 'react-router-dom';
import Alert from "./Alert.jsx"
import HeaderHome from "./headers/HeaderHome.jsx";

export default function Home(){
  const msg = `Help keep this app free for aspirants like you, and schools. Donate here: Account number: 5348080115, Account name: John Isonguyo, Bank: Moniepoint. Thank you for your support.-  center26 Team`;
  return (<>
    <HeaderHome />
    <section id="home">
      <p><strong>Yes!! It's absolutely  FREE</strong><br/>	
    By simulating UTME with actual past 
    questions, <strong>centre26</strong> aim to build aspirant's confidence and familiarity with the exam format.<br/>
    <strong>centre26</strong> provide a free platform for aspirants to test the level of their readiness for the main exam.<br/> While we are facing some challenges like  sourcing for past questions and  maintaining the app, your support  can help offset the cost and keep this app free.
    </p>
      <Alert title="Support Us" message={msg} />
      <ul  className="links">
	<li><Link to="/auth/signup">Create an account</Link></li>
	<li>Got an account?<Link to="/auth/login"> Login</Link></li>
      </ul>
    </section>
    </>);
}
