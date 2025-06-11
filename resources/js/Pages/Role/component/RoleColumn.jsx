import React, { useState, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import ButtonDelete from '@/Components/Button/ButtonDelete';

export default function RoleColumn() {
  const { permissions } = usePage().props.auth;
  const permissionEdit = permissions.includes('role_edit');
  const permissionDelete = permissions.includes('role_delete');

  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  // Limit the number of permissions to show on mobile
  const MAX_MOBILE_PERMISSIONS = 12;

  // Detect screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderPermissions = (item, isMobile) => {
    const maxPermissionsToShow = isMobile ? MAX_MOBILE_PERMISSIONS : item.permissions.length;
    const permissionsToShow = item.permissions.slice(0, maxPermissionsToShow);
    const remainingPermissions = item.permissions.length - maxPermissionsToShow;

    return (
      <>
        {permissionsToShow.map(list => (
          <span className={`label label--secondary group-hover:bg-light-primary dark:group-hover:bg-dark-primary group-hover:text-white`} key={list}> {list} </span>
        ))}
        
        {isMobile && remainingPermissions > 0 && (
          <span className={`label label--secondary group-hover:bg-light-primary dark:group-hover:bg-dark-primary group-hover:text-white`} key='more'> 
            {`${remainingPermissions} more...`} 
          </span>
        )}
      </>
    );
  }

  const columns = [
    {
      key: 'id',
      label: 'No.',
      classHead: 'table--number',
      classBody: 'text-center',
      render: (_, index) => index + 1,
    },
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'permissions',
      label: 'Permission',
      classBody: 'break-word',
      render: (item) => renderPermissions(item, isMobile),
    },
  ];

  const action = {
    key: 'actions',
    label: 'Action',
    classHead: 'table--action',
    classBody: 'table--action',
    render: item => (
      <>
        {permissionEdit &&
          <Link href={route('roles.edit', item.id)} className='text-warning'>
            <Pencil className='inline-block mb-1' size={14} /> Edit
          </Link>
        }
        {(permissionDelete && item.canDelete) &&
          <ButtonDelete id={item.id} name={item.name} routeName='roles.destroy' />
        }
      </>
    ),
  };

  if (permissionEdit || permissionDelete) {
    columns.push(action);
  }

  return columns;
}