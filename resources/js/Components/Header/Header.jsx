import ButtonToggleSidebar from './ButtonToggleSidebar';
import HeaderProfile from './HeaderProfile';

export default function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className='app__header'>
      <div className='header__wrapper'>
        {/* Header Toggle Sidebar */}
        <div className='header__toggle'>
          <ButtonToggleSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        {/* Select option change Business Unit */}
        {/* <SelectBuHeader /> */}

        {/* Profile Dropdown */}
        <HeaderProfile />
      </div>
    </header>
  )
}
