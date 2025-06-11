import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { databaseBreadcrumb } from '@/Utils/BreadcrumbContent';
import MyTable from '@/Components/Table/MyTable';
import BuColumn from './component/BuColumn';
import SearchInput from '@/Components/Form/SearchInput';
import CreateButton from '@/Components/Button/CreateButton';
import Pagination from '@/Components/Pagination';
import usePaginationFilter from '@/Hook/usePaginationFilter';

function Index({ bus }) {
  const columns = BuColumn();
  const { total, from, to, current_page, last_page } = bus.meta;
	const { querySearch, handleQueryChange, handlePageChange } = usePaginationFilter(
		{ routeName: 'bus.index' }
	);

  return (
    <div className='content-box'>
      <Breadcrumb pageName='Business Unit' prevPage={databaseBreadcrumb} />

      <div className='flex flex-row justify-between items-center'>
        <SearchInput value={querySearch} onChange={handleQueryChange} />
        <CreateButton routeName='bus.create' />
      </div>

      <MyTable
        data={bus.data}
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
  <DashboardLayout title='Business Unit' children={page} />
);

export default Index;
