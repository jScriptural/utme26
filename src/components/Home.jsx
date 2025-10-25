import {Link} from 'react-router-dom';
import Alert from "./Alert.jsx"
import HeaderHome from "./headers/HeaderHome.jsx";
import ThumbsUpIcon from "/3d-thumbs-up.png";
import ThinkingIcon from "/cwok_casual_21.png";
import MissingPieIcon from "/8046554.png";
import UserCrowdIcon from "/crowd_16084887.png";


export default function Home(){
  const msg = `This platform is freely accessible to schools and the public. Your generous support helps us provide high-quality educational resources at no cost. Please consider donating to:
Account Name: John Isonguyo,Account Number: 5348080115, Bank: Moniepoint: 
Thank you for supporting our mission!
— 300plus Team`;
  return (<>
    <HeaderHome />
    <section id="home">
      <div class="intro-container">
	<figure class="intro">
	  <img src={ThumbsUpIcon} alt="" />
	  <figcaption><strong>Yes!! It&#39;s absolutely FREE</strong><br/>
    B  y simulating UTME with actual past  questions, <strong>300plus</strong> aim to build aspirant&#39;s confidence and familiarity with the exam format.<br/> <strong>300plus</strong> provide a free platform for aspirants to test the level of their readiness for the main exam.
	  </figcaption>
	</figure>
      </div>
      <div className="why-us">
	<h2> WHY CHOOSE US</h2>
	<figure className="reason-1">
	  <img src={ThinkingIcon} alt="" />
	  <figcaption><strong>Yes!! It&#39;s absolutely FREE</strong><br/>
      By simulating UTME with actual past  questions, <strong>300plus</strong> aim to build aspirant&#39;s confidence and familiarity with the exam format.<br/> <strong>300plus</strong> provide a free platform for aspirants to test the level of their readiness for the main exam.
	  </figcaption>
	</figure>
	<figure className="reason-2">
	  <img src={MissingPieIcon} alt="" />
	  <figcaption><strong>Yes!! It&#39;s absolutely FREE</strong><br/>
      By simulating UTME with actual past  questions, <strong>300plus</strong> aim to build aspirant&#39;s confidence and familiarity with the exam format.<br/> <strong>300plus</strong> provide a free platform for aspirants to test the level of their readiness for the main exam.
	  </figcaption>
	</figure>
      </div>
      <div className="outro">
	<figure>
	  <img src={UserCrowdIcon} alt="" />
	  <figcaption>
	    JOIN THE THOUSANDS OF USERS THAT TRUST US</figcaption>
	</figure>

	<div className="btn-container">
	  <Link to="/auth/signup"><button>GET STARTED</button></Link>
	</div>
      </div>


      
    {/*<Alert title="Support Us" message={msg} />
      <ul  className="links">
	<li><Link to="/auth/signup">Create an account</Link></li>
	<li>Got an account?<Link to="/auth/login"> Login</Link></li>
      </ul>*/}
    </section>
    </>);
}
