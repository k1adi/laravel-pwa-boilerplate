import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { authorizationBreadcrumb } from '@/Utils/BreadcrumbContent';
import MyTable from '@/Components/Table/MyTable';
import UserColumn from './component/UserColumn';
import SearchInput from '@/Components/Form/SearchInput';
import CreateButton from '@/Components/Button/CreateButton';
import Pagination from '@/Components/Pagination';
import usePaginationFilter from '@/Hook/usePaginationFilter';

function Index({ users }) {
  const columns = UserColumn();
  const { total, from, to, current_page, last_page } = users.meta;
	const { querySearch, handleQueryChange, handlePageChange } = usePaginationFilter(
		{ routeName: 'users.index' }
	);
  
  return (
    <div className='content-box'>
      <Breadcrumb pageName='User' prevPage={authorizationBreadcrumb} />

      <div className='flex flex-row justify-between items-center'>
        <SearchInput value={querySearch} onChange={handleQueryChange} />
        <CreateButton routeName='users.create' />
      </div>

      <MyTable
        data={users.data}
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
  <DashboardLayout title='User' children={page} />
);

export default Index;
