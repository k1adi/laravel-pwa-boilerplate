import React from 'react';
import { useForm } from '@inertiajs/react';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/Form/TextInput';
import CancelButton from '@/Components/Button/CancelButton';
import LoadingButton from '@/Components/Button/LoadingButton';

export default function BuForm({ method, initialValues, routeName, bu='' }) {
  const { data, setData, post, patch, errors, processing } = useForm({
    ...initialValues
  });

  const submit = (e) => {
    e.preventDefault();
    if (method === 'post') {
      post(route(routeName));
    } else if (method === 'patch') {
      patch(route(routeName, bu));
    }
  };

  return (
    <form onSubmit={submit} className='w-full'>
      {/* Code */}
      <FieldGroup
        label='Code'
        name='code'
        error={errors.code}
        isPrimary={true}
        maxLength='5'
        valueLength={data.code.length}
      >
        <TextInput
          id='code'
          name='code'
          className='mt-1 block w-full'
          value={data.code}
          autoComplete='code'
          placeholder='Business Unit Code...'
          onChange={(e) => setData('code', e.target.value)}
        />
      </FieldGroup>

      {/* Name */}
      <FieldGroup
        label='Name'
        name='name'
        error={errors.name}
        isPrimary={true}
        maxLength='50'
        valueLength={data.name.length}
      >
        <TextInput
          id='name'
          name='name'
          className='mt-1 block w-full'
          value={data.name}
          autoComplete='name'
          placeholder='Business Unit Name...'
          onChange={(e) => setData('name', e.target.value)}
        />
      </FieldGroup>

      <div className='flex items-center justify-end'>
        {!processing && (
          <CancelButton routeName='bus.index' />
        )}

        <LoadingButton disabled={processing}>
          Submit
        </LoadingButton>
      </div>
    </form>
  );
}