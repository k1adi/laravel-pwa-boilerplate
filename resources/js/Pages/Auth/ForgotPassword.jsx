import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/Form/TextInput';
import LoadingButton from '@/Components/Button/LoadingButton';

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('password.email'));
  };

  return (
    <GuestLayout>
      <Head title="Forgot Password" />

      <div className="mb-4 text-sm text-gray-600">
        Forgot your password? No problem. Just let us know your email address and we will email you a password
        reset link that will allow you to choose a new one.
      </div>

      {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

      <form onSubmit={submit}>
        <FieldGroup
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
            isFocused={true}
            autoComplete='email'
            placeholder='Email address...'
          />
        </FieldGroup>

        <div className="flex items-center justify-end mt-4">
          <LoadingButton disabled={processing}>
            Email Password Reset Link
          </LoadingButton>
        </div>
      </form>
    </GuestLayout>
  );
}
