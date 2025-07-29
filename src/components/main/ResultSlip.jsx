
export default function ResultSlip({setShowResultSlip,scores}){
  
  return (<>
      <section id="resultslip">
	<div className="arrow-con"><i className="fa fa-arrow-left" onClick={()=>setShowResultSlip(false)}></i></div>
	<div className="transcript-container">
	  <h1>Result</h1>
	  <div className="theading">
	    <span className="col1">Subjects</span>
	    <span className="col2">Scores</span>
	  </div>
	  <hr className="result-hr" />
	  <hr className="result-hr" />
	  <ul className="transcript">
	    {Array.from(Object.keys(scores)).map((sub,ind)=>(
	      <li key={ind} className="field">
		<span className="course">{sub}</span>
		<span className="grade">{scores[sub]}</span>
	      </li>

	    ))}
	  </ul>
	  <hr className="result-hr" />
	  <hr className="result-hr" />
	  <div className="aggregator">
	      <span className="key">AGGREGATE</span>
	      <span className="aggregate">{Array.from(Object.values(scores)).reduce((curr,prev)=>curr+prev,0)}</span>
	  </div>
	  <hr className="result-hr" />
	  <hr className="result-hr" />
	</div>
	<div className="review-btn-container">
	  <button className="review-btn">Review</button>
	</div>
      </section>
    </>)
}
