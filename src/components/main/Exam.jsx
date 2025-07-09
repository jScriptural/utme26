import {useState, useEffect } from "react";
import {useAuth} from "../../context/Auth.jsx";
import HeaderExam from "../headers/HeaderExam.jsx";
import {useSubscription} from "../../context/Subscription.jsx";
import {Link,Navigate} from "react-router";
import Card from "./Card.jsx";



export default function Exam(){
  const {currentUser,logOut} = useAuth();
  const [secs, setSecs] = useState(59);
  const [showMenu, setShowMenu] = useState(false);
  const [currQuest, setCurrQuest] = useState(0);
  const [mins, setMins] = useState(4);
  const {
    selections,
    questions,
    mode,
    setMode} = useSubscription();

  const handleSubmit = evt =>{
    evt.preventDefault();
    const inputs = document.querySelectorAll("input:checked");
  }

  const handleNext = evt => {
    const max = questions.length - 1;
    setCurrQuest(p=> p < max?++p:p);
  }

  const handleJmp = evt => {
    const target = evt.target;
    const len = questions.length;
    const s = selections.length;
    setCurrQuest(target.dataset.index * (len/s));
  }

  const handlePrev = evt => {
    setCurrQuest(p=> p != 0?--p:p); 
  }

  useEffect(()=>{
    window.scrollTo({
      behaviour:"smooth",
      top: 0,
      left: 0,
    })

    return ()=>{
      setMode(null);
    }
  },[]);

  return (<>
    <HeaderExam setShowMenu={setShowMenu}/>
    {selections.length? (
      <section id="exam">
	<ul className="subjects">
	  {selections.map((s,i,a)=>(
	    <li key={i} className={(currQuest >= i*(questions.length/a.length) && currQuest < ((i+1)*(questions.length/a.length)))?"active":""} data-index={i} onClick={handleJmp}> {s} </li>
	  ))}
	</ul>
	<hr />
	<div className="timer-n-submit-container">
	  <div className="timer" style={{display: !mode?"block":"none"}}>{mins+":"+secs}</div>
	  <div className="submit-container"><button className="btn" onClick={handleSubmit}>Submit</button></div>
	</div>
	<hr />
	{questions.map((q,i)=>(
	  <Card key={i} data={q} index={i} showIndex={currQuest}  />
	))}
	<div className="controls">
	  <button className="btn prev"onClick={handlePrev}>prev</button>
	  <button className="btn next"onClick={handleNext}>next</button>
	</div>
	{showMenu && (<div className="menu-container">
	  <div className="cancel" ><span onClick={()=>setShowMenu(false)}>x</span></div>
	  <ul className="menu">
	    {questions.map((d,i)=>(
	      <li key={i} onClick={()=>{setCurrQuest(i); setShowMenu(false)}}>{i+1}</li>
	    ))}
	  </ul>
	</div>)}
      </section>) : <Navigate to="/main" replace />
    }
    </>)
}
