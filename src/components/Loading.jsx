import Centre26Logo from "./headers/Centre26Logo.jsx";


export default function Loading(){
  
  return (
    <section id="loading">
      <Centre26Logo className="logo"/>
      <div className="text">
	<i className="fa fa-spinner fa-spin"></i>
	<span> Initializing </span>
      </div>
    </section>
  )
}
