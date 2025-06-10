import { Link } from "@inertiajs/react";
import { User, LogOut } from "lucide-react";
import ToggleTheme from "./ToggleTheme";

export default function DropdownProfile() {
  return (
    <div className='dropdown__wrapper'>
      <ul className='dropdown__content'>
        <Link
          href={route('profile.index')}
          className={`dropdown__list primary`}
        >
          <User /> Profile
        </Link>
      </ul>

      <ToggleTheme className='dropdown__list' />

      <Link href={route('logout')} method="post" as="button" className={`dropdown__log-out`}>
        <LogOut /> Log Out 
      </Link>
    </div>
  );
}
