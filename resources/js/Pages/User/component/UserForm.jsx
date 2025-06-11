import React from 'react';
import { useForm } from '@inertiajs/react';

import UserMainField from './UserMainField';
import BuRoleField from './BuRoleField';

export default function UserForm({ 
  method,
  initialValues,
  routeName,
  user='',
  selectOption='',
  page='User' 
}) {
  const { data, setData, post, put, errors, processing } = useForm({
    ...initialValues
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (method === 'post') {
      post(route(routeName));
    } else if (method === 'patch') {
      put(route(routeName, {user}));
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <UserMainField
        data={data}
        setData={setData}
        errors={errors}
        page={page}
      />

      <BuRoleField
        data={data}
        setData={setData}
        errors={errors}
        processing={processing}
        selectOption={selectOption}
        page={page}
      />
    </form>
  );
}
