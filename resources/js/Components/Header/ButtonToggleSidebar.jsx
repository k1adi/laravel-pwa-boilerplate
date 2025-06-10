export default function ButtonToggleSidebar({ sidebarOpen, setSidebarOpen }) {
    return (
      <button
        aria-controls='sidebar'
        onClick={(e) => {
          e.stopPropagation();
          setSidebarOpen(!sidebarOpen);
        }}
        className='btn--toggle-sidebar'
      >
        <span className='bar'>
          <span className='bar__wrapper'>
            <span className={`bar__label ${!sidebarOpen && 'bar--open'}`} />
            <span className={`bar__label bar-2 ${!sidebarOpen && 'bar--open'}`} />
            <span className={`bar__label bar-3 ${!sidebarOpen && 'bar--open'}`} />
          </span>
          <span className='cross'>
            <span className={`cross-bar-1 ${!sidebarOpen && 'cross-bar--open'}`} /> 
            <span className={`cross-bar-2 ${!sidebarOpen && 'cross-bar--open-delayed'}`} /> 
          </span>
        </span>
      </button>
    );
  }
  