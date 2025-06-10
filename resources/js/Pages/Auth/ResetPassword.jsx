import React, { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/Form/TextInput';
import LoadingButton from '@/Components/Button/LoadingButton';
import { Eye, EyeOff } from 'lucide-react';

export default function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const submit = (e) => {
    e.preventDefault();
    post(route('password.store'));
  };

  return (
    <GuestLayout>
      <Head title="Reset Password" />

      <form onSubmit={submit}>
        <FieldGroup
          label='Email'
					name='email'
          error={errors.email}
          isPrimary={true}
        >
          <TextInput
            id='email'
            name='email'
            type='email'
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className='mt-1 block w-full'
            required
            autoComplete='email'
            placeholder='Email address...'
          />
        </FieldGroup>

        <FieldGroup 
          label='Password'
          name='password'
          error={errors.password}
          isPrimary={true}
          className='relative'
        >
          <TextInput
            id='Password'
            type={showPassword ? 'text' : 'password'}
            name='Password'
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            className='mt-1 block w-full'
            required
            isFocused={true}
            autoComplete='Password'
            placeholder='Password...'
          />

          <button type='button' onClick={togglePasswordVisibility} className='absolute top-1/2 right-3'>
            {showPassword ? <Eye className='text-slate-400' /> : <EyeOff className='text-slate-400' />}
          </button>
        </FieldGroup>

        <FieldGroup 
          label='Confirm Password'
          name='password_confirmation'
          error={errors.password_confirmation}
          isPrimary={true}
          className='relative'
        >
          <TextInput
            id='password_confirmation'
            type={showConfirmPassword ? "text" : "password"}
            name='password_confirmation'
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            className="mt-1 block w-full"
            required
            autoComplete="new-password"
            placeholder="Password Confirmation.."
          />

          <button type='button' onClick={toggleConfirmPasswordVisibility} className='absolute top-1/2 right-3'>
            {showConfirmPassword ? <Eye className='text-slate-400' /> : <EyeOff className='text-slate-400' />}
          </button>
        </FieldGroup>

        <div className="flex items-center justify-end mt-4">
          <LoadingButton disabled={processing}>
            Reset Password
          </LoadingButton>
        </div>
      </form>
    </GuestLayout>
  );
}
