import {useState, useEffect } from "react";
import {useAuth} from "../../context/Auth.jsx";
import {useSubscription} from "../../context/Subscription.jsx";
import {Link,Navigate} from "react-router";


export default function Exam(){
  const {currentUser,logOut}  = useAuth();
  const {
    selections,
    questions } = useSubscription();
  console.log("quest",questions);


  return (<>
    {selections.length? (
      <section id="exam">
       <ul>
	{selections.map((s,i)=>(
	  <li key={i}> {s} </li>
	))}
       </ul>
       <div>
	{questions.map((q,i)=>(
	  <ul key={i}>
	    <li>{q.questionText}</li>
	    <li><ul>{q.options.map((opt,i)=>(
		<li key={i}>{opt}</li>
	    ))}</ul></li>  
	    <li>{q.year}</li>
	    <li>{q.answer}</li>
	  </ul>  
	))}
      </div>
      </section>) : <Navigate to="/main" replace />
    }
    </>)
}
