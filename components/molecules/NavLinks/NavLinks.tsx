import NavLink from '@components/atoms/NavLink/NavLink'
import CubeIcon from '@components/Icons/CubeIcon/CubeIcon'
import CursorClickIcon from '@components/Icons/CursorClickIcon/CursorClickIcon'
import KeyIcon from '@components/Icons/KeyIcon/KeyIcon'
import DocumentTextIcon from '@components/Icons/DocumentTextIcon/DocumentTextIcon'
import BookOpenIcon from '@components/Icons/BookOpenIcon/BookOpenIcon'

interface Props {
  textSize?: string
}

const NavLinks: React.FC<Props> = ({ textSize }) => {
  return (
    <nav className={`px-2 space-y-1 ${textSize}`}>
      <NavLink url="/" Icon={CubeIcon}>
        Nodes
      </NavLink>
      <NavLink url="/endpoints" Icon={CursorClickIcon}>
        Endpoints
      </NavLink>
      <NavLink url="/keys" Icon={KeyIcon}>
        Keys
      </NavLink>
      <NavLink url="/contracts" Icon={DocumentTextIcon}>
        Contracts
      </NavLink>
      <NavLink url="/addressbook" Icon={BookOpenIcon}>
        Address Book
      </NavLink>
    </nav>
  )
}

export default NavLinks
