import React, { useState } from 'react'
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/Form/TextInput';
import { Eye, EyeOff } from 'lucide-react';

export default function MainField({ data, setData, errors, page='User' }){
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
  };

  return (
		<div className='content-box mb-2'>
			{/* Username */}
			<FieldGroup
				label='Username'
				name='username'
				error={errors.username}
				isPrimary={true}
				maxLength='25'
				valueLength={data.username.length}
			>
				<TextInput
					id='username'
					name='username'
					className='mt-1 block w-full'
					value={data.username}
					isFocused
					required
					autoComplete='username'
					placeholder='Username...'
					onChange={(e) => setData('username', e.target.value)}
				/>
			</FieldGroup>

			{/* Fullname */}
			<FieldGroup
				label='Fullname'
				name='fullname'
				error={errors.fullname}
				isPrimary={true}
				maxLength='60'
				valueLength={data.fullname.length}
			>
				<TextInput
					id='fullname'
					name='fullname'
					className='mt-1 block w-full'
					value={data.fullname}
					autoComplete='fullname'
					placeholder='Fullname...'
					onChange={(e) => setData('fullname', e.target.value)}
					required
				/>
			</FieldGroup>

			{/* Email */}
			<FieldGroup
				label='Email'
				name='email'
				error={errors.email}
				isPrimary={true}
				maxLength='50'
				valueLength={data.email.length}
			>
				<TextInput
					id='email'
					name='email'
					type='email'
					className='mt-1 block w-full'
					value={data.email}
					autoComplete='email'
					placeholder='User email...'
					onChange={(e) => setData('email', e.target.value)}
					required
				/>
			</FieldGroup>

			{/* Phone */}
			<FieldGroup
				label='Phone / WhatsApp'
				name='phone'
				error={errors.phone}
				isPrimary={true}
				maxLength='16'
				valueLength={data.phone.length}
			>
				<TextInput
					id='phone'
					name='phone'
					className='mt-1 block w-full'
					value={data.phone}
					autoComplete='phone'
					placeholder='(+62 812-1234-1234)'
					onChange={(e) => setData('phone', e.target.value)}
					required
				/>
			</FieldGroup>

			{/* Password */}
			<FieldGroup
				label='Password'
				name='password'
				error={errors.password}
				isPrimary={true}
				className='relative'
			>
				<TextInput
					id='password'
					name='password'
					type={showPassword ? 'text' : 'password'}
					className='mt-1 block w-full'
					value={data.password}
					autoComplete='password'
					placeholder='User password...'
					onChange={(e) => setData('password', e.target.value)}
				/>

				<button type='button' onClick={togglePasswordVisibility} className='absolute top-1/2 right-3'>
					{showPassword ? <Eye className='text-slate-400' /> : <EyeOff className='text-slate-400' />}
				</button>
			</FieldGroup>
		</div>
  );
}