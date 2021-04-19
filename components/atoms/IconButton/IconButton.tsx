import { ReactElement } from 'react'

interface Props {
  srText: string
  className?: string
  onClick: () => void
  children: ReactElement
}

const IconButton: React.FC<Props> = (props) => {
  const { srText, className, onClick, children } = props

  return (
    <button className={className} onClick={onClick}>
      <span className="sr-only">{srText}</span>
      {children}
    </button>
  )
}

export default IconButton
