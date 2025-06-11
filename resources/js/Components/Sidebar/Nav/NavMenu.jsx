import { usePage } from '@inertiajs/react';
import NavGroup from './NavGroup';
import NavLink from './NavLink';
import AuthMenu from './Menu/AuthMenu';
import { ChevronDown, Bug, LayoutDashboard, UserCog, Database } from 'lucide-react';
import DatabaseMenu from './Menu/DatabaseMenu';

export default function NavMenu({ sidebarExpand, setSidebarExpand }) {
  const { url: inertiaUrl } = usePage();
  const urlPath = inertiaUrl.split('/');
  const { permissions } = usePage().props.auth;
  const menuProps = { permissions, urlPath };

  const authMenu = ['user_access', 'role_access', 'permission_access'];

  return (
    <nav className='nav'>
      <ul className='nav__list top'>
        {/* Dashboard */}
        {/* {permissions.includes('dashboard_access') && */}
          <NavLink
            link={route('dashboard')}
            icon={<LayoutDashboard />}
            name='dashboard'
            text='Dashboard'
            active={urlPath[1] == 'dashboard'}
          />
        {/* } */}

        {/* {databaseMenu.some(value => permissions.includes(value)) && */}
          <NavGroup isActive={urlPath[1] == 'database'}>
            {(handleClick, open) => {
              return (
                <>
                  <NavLink
                    icon={<Database />}
                    text='Database'
                    onClick={(e) => {
                      e.preventDefault();
                      sidebarExpand ? handleClick() : setSidebarExpand(true); 
                    }}
                    active={urlPath[1] == 'database'}
                  >
                    <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 ${open && 'rotate-180'}`} />
                  </NavLink>
                  <div className={`translate transform overflow-hidden ${!open && 'hidden'}`} >
                    <DatabaseMenu {...menuProps}/>
                  </div>
                </>
              );
            }}
          </NavGroup>
        {/* } */}
        
        {/* Authorization */}
        {/* {authMenu.some(value => permissions.includes(value)) && */}
          <NavGroup isActive={urlPath[1] == 'authorization'}>
            {(handleClick, open) => {
              return (
                <>
                  <NavLink
                    icon={<UserCog />}
                    text='Authorization'
                    onClick={(e) => {
                      e.preventDefault();
                      sidebarExpand ? handleClick() : setSidebarExpand(true); 
                    }}
                    active={urlPath[1] == 'authorization'}
                  >
                    <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 ${open && 'rotate-180'}`} />
                  </NavLink>
                  <div className={`translate transform overflow-hidden ${!open && 'hidden'}`} >
                    <AuthMenu {...menuProps} />
                  </div>
                </>
              );
            }}
          </NavGroup>
        {/* } */}
      </ul>

      <ul className='nav__list'>
        <li>
          <a className='nav__link' href='https://forms.gle/TdkZUmF8ay24trRL9' target='_blank'>
            <Bug /> Report Bug/Issues
          </a>
        </li>
      </ul>
    </nav>
  );
}