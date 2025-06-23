import {useAuth} from "../../context/Auth.jsx";
import {useSubscription} from "../../context/Subscription.jsx";
import {Link,Navigate} from "react-router";

export default function Exam(){
  const {currentUser,logOut}  = useAuth();
  const {selections} = useSubscription();


  return (<>
    {selections.length? (
      <section id="exam">
       <ul>
	{selections.map((s,i)=>(
	  <li key={i}> {s} </li>
	))}
       </ul>
      </section>) : <Navigate to="/main" replace />
    }
    </>)
}
