import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { userBreadcrumb } from '@/Utils/BreadcrumbContent';
import UserForm from './component/UserForm';

function Create({ bus, roles }) {
  const selectOption = {bus, roles};

  const data = {
		username: '',
		fullname: '',
		email: '',
		phone: '',
		password: '',
		pivots: [{
			bu_id: '',
			buSelected: '',
			role_id: '',
			roleSelected: '',
		}],
	};

  return (
	<>
	  <div className='content-box mb-2'>
			<Breadcrumb title='User Create' pageName='Create' prevPage={userBreadcrumb} className='!mb-0'/>
	  </div>

	  <UserForm
			method='post'
			initialValues={data}
			routeName='users.store'
			selectOption={selectOption}
	  />
	</>
  );
}

Create.layout = page => (
  <DashboardLayout title='User' children={page} />
);

export default Create;
