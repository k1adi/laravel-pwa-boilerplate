export default function Checkbox({ className = '', isDisabled = false, ...props }) {
	const getClasses = (checked) => {
		return [
			'rounded border-gray-300 shadow-sm',
			// Apply different colors based on checked state and theme
			checked ? 'text-light-primary focus:ring-light-primary dark:text-dark-primary dark:focus:ring-dark-primary' : 'text-gray-400 focus:ring-gray-400 dark:text-gray-600 dark:focus:ring-gray-600',
			isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
			className
		].join(' ');
	};

	return (
		<input
			{...props}
			type="checkbox"
			className={getClasses(props.checked)}
			disabled={isDisabled}
			readOnly={isDisabled}
		/>
	);
}
