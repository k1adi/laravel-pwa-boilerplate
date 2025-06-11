import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { authorizationBreadcrumb } from '@/Utils/BreadcrumbContent';
import MyTable from '@/Components/Table/MyTable';
import RoleColumn from './component/RoleColumn';
import SearchInput from '@/Components/Form/SearchInput';
import CreateButton from '@/Components/Button/CreateButton';
import Pagination from '@/Components/Pagination';
import usePaginationFilter from '@/Hook/usePaginationFilter';

function Index({ roles }) {
  const columns = RoleColumn();
  const { total, from, to, current_page, last_page } = roles.meta;
	const { querySearch, handleQueryChange, handlePageChange } = usePaginationFilter(
		{ routeName: 'roles.index' }
	);
  
  return (
    <div className='content-box'>
      <Breadcrumb pageName='Role' prevPage={authorizationBreadcrumb} />

      <div className='flex flex-row justify-between items-center'>
        <SearchInput value={querySearch} onChange={handleQueryChange} />
        <CreateButton routeName='roles.create' />
      </div>

      <MyTable 
        data={roles.data} 
        columns={columns}
        from={from}
      />

      <Pagination
        total={total}
        firstIndex={from}
        lastIndex={to}
        currentPage={current_page}
        lastPage={last_page}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

Index.layout = page => (
  <DashboardLayout title='Role' children={page} />
);

export default Index;
