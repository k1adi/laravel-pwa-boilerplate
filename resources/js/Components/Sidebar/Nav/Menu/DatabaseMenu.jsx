import NavLink from '../NavLink'
import { Building2} from 'lucide-react'

export default function DatabaseMenu({ permissions, urlPath }) {
  return (
    <ul className='nav__dropdown'>
      {/* Business Unit */}
      {/* {permissions.includes('bu_access') && */}
        <NavLink
          link={route('bus.index')}
          icon={<Building2 />}
          name='bus'
          text='Business Unit'
          active={urlPath[2] == 'bus'}
        />
      {/* } */}
    </ul>
  )
}