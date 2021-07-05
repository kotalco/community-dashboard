import React from 'react'

interface Props {
  title: string
}

const CreateNode: React.FC<Props> = ({ title, children }) => {
  return (
    <>
      <h1 className="text-2xl font-semibold">{title}</h1>

      <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 mt-4 px-4 py-5 sm:p-6">
        {children}
      </div>
    </>
  )
}

export default CreateNode
