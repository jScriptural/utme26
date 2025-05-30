
export default function Centre26Logo(props){

  return (
    <figure id="centre26Logo" className={props.className}>
      <svg width="115" height="65" xmlns="http://www.w3.org/2000/svg">
	<rect x="35" y="0" width="45" height="45" fill="#000"/>
	<line x1="52.5" y1="22.5" x2="62.5" y2="22.5" stroke="#c2950a" strokeWidth="10"/>
	<text x="57.5" y="60" fontSize="18" textAnchor="middle" fill={props.fill} fontFamily="kumbh sans, Arial, sans-serif" fontWeight="bold">centre26</text>    
      </svg>
    </figure>
  )
}
