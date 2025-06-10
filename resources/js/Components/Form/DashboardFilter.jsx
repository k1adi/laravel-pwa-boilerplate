import React from 'react';
import Select from 'react-select';
import FieldGroup from '@/Components/Form/FieldGroup';
import DateTimePicker from '@/Components/Form/DateTimePicker';
import { ShortFormatDateFlatpickr } from '@/utils/FormattedDateFlatpickr';
import { usePage } from '@inertiajs/react';

export default function DashboardFilter({ 
  filters,
  onFilterChange,
  productOptions,
  productSelected
}) {
  const { bu } = usePage().props;
  const handleDateChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const handleProductChange = (option) => {
    onFilterChange({
      ...filters,
      product: option?.value || '',
    });
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-2 justify-end mt-3'>
      <span className='w-full order-1'>
        <FieldGroup name='product' className='!mb-0'>
          <Select
            id='product'
            placeholder='Select Product...'
            options={productOptions}
            value={productSelected}
            onChange={handleProductChange}
            classNames={{
              control: ({ isFocused }) =>
                isFocused ? `ring-2 !border-${bu.code} !ring-${bu.code}` : 'border-gray-300',
            }}
            menuPortalTarget={document.body}
            menuPosition={'fixed'}
          />
        </FieldGroup>
      </span>
      <span className='w-full order-3 md:order-2'>
        <FieldGroup name='start_date' className='!mb-0'>
          <DateTimePicker
            value={filters.start_date}
            className='block w-full'
            name='start_date'
            placeholder='Start Date...'
            withTime={false}
            shortFormat={true}
            onChange={(value) => {
              const dateValue = ShortFormatDateFlatpickr(value);
              handleDateChange('start_date', dateValue == '1970-01-01' ? '' : dateValue);
            }}
          />
        </FieldGroup>
      </span>
      <span className='w-full order-4 md:order-3'>
        <FieldGroup name='end_date' className='!mb-0'>
          <DateTimePicker
            value={filters.end_date}
            className='block w-full'
            name='end_date'
            placeholder='End Date...'
            withTime={false}
            shortFormat={true}
            onChange={(value) => {
              const dateValue = ShortFormatDateFlatpickr(value);
              handleDateChange('end_date', dateValue == '1970-01-01' ? '' : dateValue);
            }}
          />
        </FieldGroup>
      </span>
    </div>
  )
}