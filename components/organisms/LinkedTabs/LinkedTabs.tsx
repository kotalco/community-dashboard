import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props {
  tabs: { name: string; href: string }[]
}

const Tabs: React.FC<Props> = ({ tabs }) => {
  const { pathname } = useRouter()

  return (
    <nav className="flex divide-x-2" aria-label="Tabs">
      {tabs.map(({ name, href }) => (
        <Link key={name} href={href}>
          <a
            className={`${
              pathname === href
                ? 'border-indigo-500 text-indigo-600 shadow'
                : 'text-gray-500 hover:text-gray-700'
            } first:rounded-tl-lg last:rounded-tr-lg whitespace-nowrap py-4 px-8 border-b-2 font-medium text-sm bg-white`}
            aria-current={pathname === href ? 'page' : undefined}
          >
            {name}
          </a>
        </Link>
      ))}
    </nav>
  )
}

export default Tabs
