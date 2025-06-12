import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import UserForm from '../User/component/UserForm';
import ConvertOptions from '@/Utils/ConvertOptions';

const Index = ({ user, pivots, bus, roles }) => {
  const prevPage = [{ link: route('dashboard'), text: 'Dashboard' }];
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
  const selectOption = {bus, roles};

  return (
    <>
      <div className='content-box mb-2'>
        <Breadcrumb title='My Profile' pageName='Profile' prevPage={prevPage} className='!mb-0' />
      </div>

      <UserForm
        method='patch'
        initialValues={data}
        routeName='profile.update'
        selectOption={selectOption}
        user={user}
        page='Profile'
      />
    </>
  );
}

Index.layout = (page) => (
  <DashboardLayout title='My Profile' children={page} />
);

export default Index;