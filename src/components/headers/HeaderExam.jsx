import Centre26Logo from './Centre26Logo.jsx';


export default function HeaderExam({setShowMenu}){
  return (
    <nav id="navExam">
	<Centre26Logo className="logo"/>
        <button aria-label="Open menu" className="menu-icon" onClick={()=>setShowMenu(s=>!s)}>
	  <svg viewBox="0 0 24 24" width="50" height="40">
	    <rect x="3" y="6" width="18" height="2" fill="#dcdcdc"/>
	    <rect x="3" y="11" width="18" height="2"fill="#dcdcdc"/>
	    <rect x="3" y="16" width="18" height="2" fill="#dcdcdc"/>
	  </svg>
	</button>
    </nav>
  )
}

