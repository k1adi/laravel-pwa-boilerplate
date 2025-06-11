import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { permissionBreadcrumb } from '@/utils/BreadcrumbContent';
import PermissionForm from './component/PermissionForm';

function Create() {
	const data = {
		name: '',
	};

	return (
		<div className='content-box'>
			<Breadcrumb title='Permission Create' pageName='Create' prevPage={permissionBreadcrumb} />
			
			<PermissionForm
				method='post'
				initialValues={data}
				routeName='permissions.store'
			/>
		</div>
	);
}

Create.layout = page => (
	<DashboardLayout title='Permission' children={page} />
);

export default Create;
