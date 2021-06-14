import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props {
  tabs: { name: string; href: string }[]
}

const Tabs: React.FC<Props> = ({ tabs }) => {
  const { pathname } = useRouter()

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map(({ name, href }) => (
          <Link key={name} href={href}>
            <a
              className={`${
                pathname === href
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              aria-current={pathname === href ? 'page' : undefined}
            >
              {name}
            </a>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Tabs
