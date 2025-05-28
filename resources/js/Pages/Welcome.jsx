import { Link, Head } from '@inertiajs/react';
import { BrickWall } from 'lucide-react';

export default function Welcome({ auth }) {
  return (
    <>
      <Head title="Welcome" />
      <div className="welcome__parent">
        <div className="welcome__navigation">
          {auth.user ? (
            <Link href={route('dashboard')} className="btn btn--primary">
              Dashboard
            </Link>
          ) : (
            <Link href={route('login')} className="btn btn--primary">
              Log in
            </Link>
          )}
        </div>

        <div className="welcome__content">
          <div className="welcome__content__inner">
            <BrickWall className="welcome__content__logo" />

            <span className="italic font-medium">Welcome to</span>
            <h1 className="text--heading">
              PWA boilerplate
            </h1>

            <h2 className="italic text-xl">
              Laravel Progressive Web App Boilerplate
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
