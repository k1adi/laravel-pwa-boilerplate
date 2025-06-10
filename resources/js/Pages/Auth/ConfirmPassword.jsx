import React, { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/Form/TextInput';
import LoadingButton from '@/Components/Button/LoadingButton';
import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'));
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div className="mb-4 text-sm text-gray-600">
                This is a secure area of the application. Please confirm your password before continuing.
            </div>

            <form onSubmit={submit}>
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
                        autoComplete='Password'
                        placeholder='Password...'
                    />

                    <button type='button' onClick={togglePasswordVisibility} className='absolute top-1/2 right-3'>
                        {showPassword ? <Eye className='text-slate-400' /> : <EyeOff className='text-slate-400' />}
                    </button>
                </FieldGroup>

                <div className="flex items-center justify-end mt-4">
                    <LoadingButton disabled={processing}>
                        Confirm
                    </LoadingButton>
                </div>
            </form>
        </GuestLayout>
    );
}
