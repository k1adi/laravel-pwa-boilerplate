import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { businessUnitBreadcrumb } from '@/Utils/BreadcrumbContent';
import BuForm from './component/BuForm';

function Create() {
  const data = {
    code: '',
    name: ''
	};

  return (
    <div className='content-box'>
      <Breadcrumb title='Business Unit Create' pageName='Create' prevPage={businessUnitBreadcrumb} />

      <BuForm
        method='post'
        initialValues={data}
        routeName='bus.store'
      />
    </div>
  );
}

Create.layout = page => (
  <DashboardLayout title='Business Unit' children={page} />
);

export default Create;
