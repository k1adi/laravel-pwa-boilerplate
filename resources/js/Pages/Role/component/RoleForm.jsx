import React from 'react';
import { useForm } from '@inertiajs/react';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/Form/TextInput';
import Select from 'react-select';
import CancelButton from '@/Components/Button/CancelButton';
import LoadingButton from '@/Components/Button/LoadingButton';

export default function RoleForm({ method, initialValues, routeName, permissions, role='' }) {
  const { data, setData, post, patch, errors, processing } = useForm({
    ...initialValues
  });

  const handlePermissionChange = (option) => {
    const permissionId = option.map(item => item.value);
		setData((prevData) => ({
			...prevData,
			permission: permissionId,
			permissionSelected: option,
		}));
	}

  const submit = (e) => {
    e.preventDefault();
    if (method === 'post') {
      post(route(routeName));
    } else if (method === 'patch') {
      patch(route(routeName, role));
    }
  };

  return (
    <form onSubmit={submit} className='w-full'>
      {/* Name */}
      <FieldGroup
        label='Name'
        name='name'
        error={errors.name}
        isPrimary={true}
        maxLength='20'
        valueLength={data.name.length}
      >
        <TextInput
          id='name'
          name='name'
          className='mt-1 block w-full'
          value={data.name}
          autoComplete='name'
          placeholder='Role Name...'
          onChange={(e) => setData('name', e.target.value)}
        />
      </FieldGroup>

      {/* Permission */}
      <FieldGroup
        label='Permission'
        name='permission'
        error={errors.permission}
        isPrimary={true}
      >
        <Select
          id='permission'
          options={permissions}
          value={data.permissionSelected}
          onChange={handlePermissionChange}
          className='mt-1 block w-full'
          isMulti
          required
        />
      </FieldGroup>

      <div className='flex items-center justify-end'>
        {!processing && (
          <CancelButton routeName='roles.index' />
        )}

        <LoadingButton disabled={processing}>
          Submit
        </LoadingButton>
      </div>
    </form>
  );
}