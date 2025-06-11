import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { businessUnitBreadcrumb } from '@/utils/BreadcrumbContent';
import BuForm from './component/BuForm';

function Edit({ bu }) {
  const { code, name } = bu;
  const data = {
    code: code,
    name: name
	};

  return (
    <div className='content-box'>
			<Breadcrumb title='Business Unit Edit' pageName='Edit' prevPage={businessUnitBreadcrumb} />
      
      <BuForm
        method='patch'
        initialValues={data}
        routeName='bus.update'
        bu={bu}
      />
    </div>
  );
}

Edit.layout = page => (
  <DashboardLayout title='Business Unit' children={page} />
);

export default Edit;
