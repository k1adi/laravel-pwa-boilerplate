import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { roleBreadcrumb } from '@/Utils/BreadcrumbContent';
import RoleForm from './component/RoleForm';

function Create({ permissions }) {
  const data = {
	permission: '',
	permissionSelected: '',
		name: '',
	};

  return (
	<div className='content-box'>
		<Breadcrumb title='Role Create' pageName='Create' prevPage={roleBreadcrumb} />
	  
	  <RoleForm 
		method='post'
		initialValues={data}
		permissions={permissions}
		routeName='roles.store'
	  />
	</div>
  );
}

Create.layout = page => (
  <DashboardLayout title='Role' children={page} />
);

export default Create;
