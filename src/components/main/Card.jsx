import {useState, useEffect} from "react";


export default function Card({data,index,showIndex}){

  return (<>
      <section id="card" hidden={showIndex != index}>
	<div className="q-container">
	  <p className="q-box">
	    <span>{"Q"+(index+1)+"."}</span>
	    { data.questionText}
	  </p>
	  <span className="year">JAMB {data.year}</span>
	</div>
	<div className="options-container">	
	  <ul className="options">
	    {data.options.map((opt,i)=>(
	      <li key={i} className="option">
		<input type="radio" name={"opt"+index} data-qindex={index} id={"opt"+i+"q"+index} value={opt}/>
		<label htmlFor={"opt"+i+"q"+index}>{opt}</label>
	      </li>
	    ))}
	  </ul>
	</div>
      </section>
    </>)
}
