import React from 'react';
import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import ConfirmDelete from '@/Components/Notification/ConfirmDelete';

const ButtonDelete = ({ id, routeName, className='', withText=true, name='' }) => {
  const handleDelete = async () => {
    const confirmed = await ConfirmDelete(name);
    if (confirmed) {
      router.delete(route(routeName, id));
    }
  };

  return (
    <button className={'text-red-600 ml-2 ' + className} onClick={handleDelete}>
      <Trash2 
        className='inline-block mb-1' 
        size={withText ? 14 : 16} 
        strokeWidth={withText ? 2 : 3}
      /> 
      {withText && ' Delete'}
    </button>
  );
};

export default ButtonDelete;
