import clsx from 'clsx';
import { Link } from '@inertiajs/react';

export default function NavLink({ 
  link = '#', 
  icon = '', 
  name, 
  text, 
  active = false, 
  children = '', 
  className = '',
  ...props 
 }) {
  const isActive = active || route().current(`${name}*`);

  const linkClasses = clsx(
    'nav__link',
    isActive
      ? `text-dark-txt dark:text-white bg-light-primary dark:bg-dark-primary hover:bg-light-primary dark:hover:bg-dark-primary`
      : `hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-txt`,
    className
  );
  
  return (
    <li>
      <Link href={link} className={linkClasses} {...props}>
        {icon} 
        <span className='pr-6'> {text} </span>
        {children}
      </Link>
    </li>
  );
}
