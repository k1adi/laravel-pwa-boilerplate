import { Link } from '@inertiajs/react';

export default function CancelButton({ routeName, textButton='Cancel' }) {
  return (
    <Link href={route(routeName)} className='btn btn--secondary me-2'>
      {textButton}
    </Link>
  );
}