import center26Logo from '/center26logo.svg';


export default function Header(){
  return (
    <section id="header">
      <header>
	<figure className="center26logo">
          <svg width="115" height="45" xmlns="http://www.w3.org/2000/svg" >
	    <rect x="0" y="0" width="45" height="45" fill="#008d34"/>
	    <line x1="17.5" y1="22.5" x2="27.5" y2="22.5" stroke="#dcdcdc" strokeWidth="10"/>
	  </svg>
	  <figcaption className="center26-text">center26</figcaption>
	</figure>
        <button aria-label="Open menu" className="menu-icon">
	  <svg viewBox="0 0 24 24" width="50" height="40">
	    <rect x="3" y="6" width="18" height="2" fill="#dcdcdc"/>
	    <rect x="3" y="11" width="18" height="2"fill="#dcdcdc"/>
	    <rect x="3" y="16" width="18" height="2" fill="#dcdcdc"/>
	  </svg>
	</button>
      </header>
    </section>
  )
}

