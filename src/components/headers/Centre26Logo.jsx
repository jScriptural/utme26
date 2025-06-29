
export default function Centre26Logo(props){

  return (
    <figure id="centre26Logo" className={props.className}>
      <svg width="100" height="75" xmlns="http://www.w3.org/2000/svg">
	<rect x="45" y="10" width="45" height="45" fill="#c2950a"/>
	<rect x="35" y="0" width="45" height="45" fill="#000"/>
	<line x1="52.5" y1="22.5" x2="62.5" y2="22.5" stroke="#c2950a" strokeWidth="10"/>
	<text x="62" y="70" fontSize="18" textAnchor="middle" fill={props.fill??"#000"} fontFamily="kumbh sans, Arial, sans-serif" fontWeight="bold">300plus</text>
      </svg>
    </figure>
  )
}
