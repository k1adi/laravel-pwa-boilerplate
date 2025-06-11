import React from 'react';
import { useForm } from '@inertiajs/react';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/Form/TextInput';
import CancelButton from '@/Components/Button/CancelButton';
import LoadingButton from '@/Components/Button/LoadingButton';

export default function PermissionForm({ method, initialValues, routeName, permission='' }) {
  const { data, setData, post, patch, errors, processing } = useForm({
	...initialValues
  });

  const submit = (e) => {
	e.preventDefault();
	if (method === 'post') {
	  post(route(routeName));
	} else if (method === 'patch') {
	  patch(route(routeName, permission));
	}
  };

  return (
	<form onSubmit={submit} className='w-full'>
	  <FieldGroup
		label='Name'
		name='name'
		error={errors.name}
		isPrimary={true}
		maxLength='100'
		valueLength={data.name.length}
	  >
		<TextInput
		  id='name'
		  name='name'
		  className='mt-1 block w-full'
		  value={data.name}
		  required
		  isFocused
		  autoComplete='name'
		  placeholder='Permission Name...'
		  onChange={(e) => setData('name', e.target.value)}
		/>
	  </FieldGroup>

	  <div className='flex items-center justify-end'>
		{!processing && (
		  <CancelButton routeName='permissions.index' />
		)}

		<LoadingButton disabled={processing}>
		  Submit
		</LoadingButton>
	  </div>
	</form>
  );
}