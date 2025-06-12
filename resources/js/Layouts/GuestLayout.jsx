import { Link } from '@inertiajs/react';
import { BrickWall } from 'lucide-react';
import NetworkStatusIndicator from '@/Components/NetworkStatusIndicator';

export default function Guest({ children }) {
  return (
    <div className="guest__parent">
      <div>
        <Link href="/">
          <BrickWall className="guest__logo" />
        </Link>
      </div>

      <div className="guest__card">
        {children}
      </div>

      {/* Network Status Indicator */}
      <NetworkStatusIndicator />
    </div>
  );
}
