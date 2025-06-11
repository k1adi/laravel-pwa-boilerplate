import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { userBreadcrumb } from '@/Utils/BreadcrumbContent';
import UserForm from './component/UserForm';
import ConvertOptions from '@/Utils/ConvertOptions';

function Edit({ bus, roles, user, pivots }) {
  const selectOption = {bus, roles};
  const { username, fullname, email, phone } = user;
  
  const data = {
		username: username,
		fullname: fullname,
    email: email,
    phone: phone,
    password: '',
    pivots: pivots.map(item => {
      return {
        bu_id: item.bu.id,
        buSelected: {
          value: item.bu.id,
          label: item.bu.name,
        },
        role_id: item.roles.map(role => role.id),
        roleSelected: ConvertOptions(item.roles),
      };
    }),
	};

  return (
    <>
      <div className='content-box mb-2'>
        <Breadcrumb title='User Edit' pageName='Edit' prevPage={userBreadcrumb} className='!mb-0' />
      </div>

      <UserForm
        method='patch'
        initialValues={data}
        routeName='users.update'
        selectOption={selectOption}
        user={user}
      />
    </>
  );
}

Edit.layout = page => (
  <DashboardLayout title='User' children={page} />
);

export default Edit;
