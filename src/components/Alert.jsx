
export default function Alert(props){
  console.log(props);
  const {title, message} = props;
  return (<>
    <section id="alert" >
	<div className="container">
	    <h1>{title}</h1>
	    <p>{message}</p>
	</div>
    </section>
    </>)
}
