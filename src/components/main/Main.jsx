import {useState,useEffect} from "react";
import {useAuth} from "../../context/Auth.jsx";
import {Link, useNavigate} from "react-router";
import HeaderMain from "../headers/HeaderMain.jsx"
import Profile from "./Profile.jsx";
import {
  useSubscription,
  subjects,
} from "../../context/Subscription.jsx";

const modes = [
"examMode",
"practiceMode"
];

export default function Main(){
  const [showProfile, setShowProfile] = useState(false);
  const [canStart,setCanStart] = useState(false);
  const navigate = useNavigate();
  const [mode,setMode] = useState(null);
  const {currentUser, logOut} = useAuth();
  const {
    selections,
    setSelections,
    getRandomQ,
    setQuestions } = useSubscription();

  function handleSubmit(evt){
    evt.preventDefault();
    const form = document.forms[modes[mode]];
    const sub = form.querySelectorAll("input:checked");
    setSelections(Array.from(sub).map((e,i)=>e.value));

    setCanStart(true);
  }

  const handleInput = (evt)=>{
    evt.preventDefault();
    evt.bubbles = false;
    const form = document.forms[modes[mode]];
    const checkedInputs = Array.from(form.querySelectorAll("input:checked"));

    if(checkedInputs.length >= 4){
      Array.from(form.querySelectorAll("input:not(:checked)")).forEach(input=>input.disabled = true);
    }else {
      Array.from(form.querySelectorAll("input:not(:checked)")).forEach(input=>input.disabled = false);
    }
  }


  useEffect(()=>{
    console.log(selections);
    if((canStart && mode == 0 && selections.length == 4) || (canStart && mode == 1 && selections.length == 1)){
      setQuestions([]);
      selections.forEach(async function (sub){
	const s = sub.split(" ")
	  .filter(p=> p !== ' ')
	  .join("_")
	  .toLowerCase();
	const q = await getRandomQ(s);
	setQuestions(p=>[...p,...q]);
      })
      navigate("/main/exam");
    }

  },[selections]);

  return (<>
    <HeaderMain setShowProfile={setShowProfile}/>
    <section id="main">
      {showProfile && <Profile />}
      <dl>
	<dt>Exam mode:</dt>
	  <dd> CBT-type experience with timer. Suitable for evaluating your general readiness for the main exam
	  </dd>
	<dt>Practice mode:</dt>
	  <dd>One subject practice test with no timer. Work at your own pace. Suitable for testing your knowledge on a particular subject
	  </dd>
      </dl>
      <h2>Select your preferred mode below:</h2>
      <form name="modes">
	<fieldset>
	  <legend> MODES </legend>
	  <label htmlFor="examMode">
	    <input type="radio" name="mode" id="examMode" value="exam-mode" onChange={evt=>setMode(0)}/>
	  Exam mode </label>
	  <label htmlFor="practiceMode"> 
	    <input type="radio" name="mode" id="practiceMode" value="practice-mode" onChange={evt=>setMode(1)}/>
	  Practice mode </label>
	</fieldset>
      </form>
      {modes[mode] === modes[1] &&(
	<form name={modes[1]}>
	  <fieldset>
	    <legend> Select a subject </legend>
	    {subjects.map((sub,ind)=>(<label htmlFor={sub.id} key={ind}><input data-index={ind} type="radio" id={sub.id} value={sub.value} name="subject" /> <span>{sub.value}</span> </label>)
	    )}
	  </fieldset>
	</form>)
      }
      {modes[mode] === modes[0] && (
	<form name={modes[0]}>
	  <fieldset>
	    <legend> Pick your subject combinations.<br /> English plus 3 other subjects. </legend>
	    {subjects.map((sub,ind)=>{
	      if(!sub.id.localeCompare("eng","en")) {
	    return (<label htmlFor={sub.id} key={ind}><input type="checkbox" name="subject" value={sub.value} data-index={ind} checked disabled={true}/> <span>{sub.value}</span></label>)
	      } else {
		return (<label htmlFor={sub.id} key={ind}><input type="checkbox" name="subject" value={sub.value} data-index={ind} onInput={handleInput}/> <span>{sub.value}</span></label>)
	      }
	    })}
	  </fieldset>
	</form>)
      }
      {(mode != null) && (<div className="btn-con">
	<button type="submit" onClick={handleSubmit}> Start exam </button>
      </div>)
      }
    </section>
    </>)
}
