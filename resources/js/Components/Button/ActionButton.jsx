export default function ActionButton({ isDisabled, children, ...props }){
  return (
    <button
      type='button'
      className={`btn btn--sm btn--primary ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
}