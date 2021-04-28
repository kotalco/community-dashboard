import React from 'react'

interface Props {
  title: string
}

const CreateNode: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 mt-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export default CreateNode
