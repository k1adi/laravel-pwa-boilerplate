import React, { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import NavMenu from './Nav/NavMenu';
import { BrickWall, ChevronsLeft } from 'lucide-react';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const trigger = useRef();
  const sidebar = useRef();

  const storedSidebarExpanded = localStorage.getItem('crm-sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('crm-sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside ref={sidebar} className={`app__sidebar lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full w-0'}`}>
      <div className='sidebar__header'>
        <Link href={route('dashboard')} className={`sidebar__logo text-light-primary dark:text-dark-primary`}>
          <BrickWall className='inline-block mb-2 me-2' size={44} /> 
          <span className='font-thin'>BOILERPLATE</span>
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className={`block lg:hidden  text-light-primary dark:text-dark-primary`}
        >
          <ChevronsLeft color='currentColor' size={29} className='mb-1' />
        </button>
      </div>

      <div className='sidebar__menu'>
        <NavMenu sidebarExpand={sidebarExpanded} setSidebarExpand={setSidebarExpanded} />
      </div>
    </aside>
  );
}