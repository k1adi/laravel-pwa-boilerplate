import NavLink from "../NavLink"
import { Users, Settings2, KeyRound } from "lucide-react"

export default function AuthMenu({ permissions, urlPath }) {
  return (
    <ul className='nav__dropdown'>
        <NavLink
          link={route('users.index')}
          icon={<Users />}
          name='users'
          text='User'
          active={urlPath[2] == 'users'}
        />
        <NavLink
          link={route('roles.index')}
          icon={<Settings2 />}
          name='roles'
          text='Role'
          active={urlPath[2] == 'roles'}
        />
        <NavLink
          link={route('permissions.index')}
          icon={<KeyRound />}
          name='permissions'
          text='Permission'
          active={urlPath[2] == 'permissions'}
        />
    </ul>
  )
}