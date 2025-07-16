import {useState,useEffect,useRef} from "react";
import {useAuth} from "../../context/Auth.jsx";
import HeaderExam from "../headers/HeaderExam.jsx";
import {useSubscription} from "../../context/Subscription.jsx";
import {Link,Navigate,useNavigate} from "react-router";
import Time from "./Time.jsx";
import Card from "./Card.jsx";



export default function Exam(){
  const submitBtnRef = useRef();
  const navigate = useNavigate();
  const {currentUser,logOut} = useAuth();
  const [secs, setSecs] = useState(59);
  const [showMenu, setShowMenu] = useState(false);
  const [picked, setPicked] = useState([]);
  const [currQuest, setCurrQuest] = useState(0);
  const [mins, setMins] = useState(4);
  const {
    selections,
    questions,
    setMode,
    mode } = useSubscription();

  const handleSubmit = evt =>{
    let aggregate = 0;
    evt.preventDefault();
   // const inputs = document.querySelectorAll("input");
    //console.log("checked",inputs);
    //navigate("/main");

    questions.forEach((q,i)=>{
      const opt = document.querySelector(`[name=opt${i}]:checked`);
      //console.log(`${"opt"+i}s`,opt);
      if(opt && (String(q.options[q.answer]) === opt.value)){
	++aggregate;
	console.log(String(q.options[q.answer]));
	console.log(opt.value);
      }
    })

    alert(`score: ${aggregate}`);
    console.log(aggregate);
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

  const handleMenuOpen = evt => {
    const nodeList = document.querySelectorAll("input:checked");
    let qindices = Array.from(nodeList).map(n=>parseInt(n.dataset.qindex));

    setPicked([...qindices]);
    setShowMenu(s=>!s);
  }

  useEffect(()=>{
    window.scrollTo({
      behaviour:"smooth",
      top: 0,
      left: 0,
    })

  },[]);

  return (<>
    <HeaderExam handleMenuOpen={handleMenuOpen}/>
    {selections.length? (
      <section id="exam">

	<ul className="subjects">
	  {selections.map((s,i,a)=>(
	    <li key={i} className={(currQuest >= i*(questions.length/a.length) && currQuest < ((i+1)*(questions.length/a.length)))?"active":""} data-index={i} onClick={handleJmp}> {s} </li>
	  ))}
	</ul>

	<hr className="hr" />

	<div className="timer-n-submit-container">
	  {selections.length > 1 && (
	    <Time submitBtn={submitBtnRef} />
	  )}

	  <div className="submit-container">
	    <button className="btn" onClick={handleSubmit} ref={submitBtnRef}>Submit</button>
	  </div>
	</div>

	<hr className="hr" />

	{questions.map((q,i)=>(
	  <Card key={i} data={q} index={i} showIndex={currQuest}  />
	))}
	
	<div className="controls">
	  <button className="btn prev"onClick={handlePrev}>Prev</button>
	  <button className="btn next"onClick={handleNext}>Next</button>
	</div>

	{showMenu && (<div className="menu-container">
	  <div className="cancel" ><span onClick={()=>setShowMenu(false)}>x</span></div>
	  <ul className="menu">
	    {questions.map((d,i)=>(
	      <li key={i} onClick={()=>{setCurrQuest(i); setShowMenu(false)}} className={picked.includes(i)?"picked":null}>{i+1}</li>
	    ))}
	  </ul>
	</div>)}

      </section>) : <Navigate to="/main" replace />
    }
    </>)
}
