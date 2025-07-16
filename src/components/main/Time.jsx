import {useState, useEffect} from "react";


export default function Time({submitBtn}){
  const [secs, setSecs] = useState(800);


  useEffect(()=>{
    const interval = setInterval(()=>{
      setSecs(s=>{
	if(s <= 0){
	  console.log("Time up");
	  submitBtn.current.dispatchEvent(new MouseEvent("click",{bubbles: true,cancelable: true}));
	  clearInterval(interval);
	  return 0;
	}else{
	  return --s;
	}
      })
    },1000);

    return ()=>clearInterval(interval);
  },[])


  return (<>
      <div className="timer">
	<span className="minutes" >{Math.trunc(secs/60)}</span>:<span className="seconds">{(secs - (Math.trunc(secs/60)*60))}</span>
      </div>
    </>)
}
