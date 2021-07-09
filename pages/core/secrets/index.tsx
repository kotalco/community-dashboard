import { useState } from 'react'
import { GetStaticProps } from 'next'
import { TrashIcon } from '@heroicons/react/outline'

import IconButton from '@components/atoms/IconButton/IconButton'
import Button from '@components/atoms/Button/Button'
import Layout from '@components/templates/Layout/Layout'
import List from '@components/organisms/List/List'
import DeleteSecretDialog from '@components/organisms/KubernetesSecrets/DeleteSecretDialog/DeleteSecretDialoge'
import { useSecrets } from '@utils/requests/secrets'
import { KubernetesSecret } from '@interfaces/KubernetesSecret/KubernetesSecret'
import { fetcher } from '@utils/axios'

interface Props {
  secrets: { secrets: KubernetesSecret[] }
}

const KubernetesSecrets: React.FC<Props> = ({ secrets }) => {
  const { data, isError } = useSecrets(secrets)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedSecret, setSelectedSecret] = useState('')

  const confirmDelete = (secretName: string) => {
    setOpenDelete(true)
    setSelectedSecret(secretName)
  }

  if (isError) return <p>failed to load secrets</p>

  return (
    <Layout>
      <div className="flex">
        <h1 className="text-2xl font-semibold text-gray-900 flex-grow">
          Secrets
        </h1>
        <Button href="/core/secrets/create" className="btn btn-primary">
          Create New Secret
        </Button>
      </div>

      <div className="py-4">
        {data && !!data.length ? (
          <List>
            {data.map(({ name, type }) => (
              <li key={name}>
                <div className="group p-4 flex items-center sm:px-6">
                  <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <div className="flex text-sm font-medium text-indigo-600 truncate">
                        <p>{name}</p>
                      </div>
                      <div className="mt-2 flex">
                        <div className="flex items-center text-sm text-gray-500">
                          {type}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-5 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
                    <IconButton
                      srText="delete"
                      onClick={() => confirmDelete(name)}
                    >
                      <TrashIcon className="h-5 w-5 text-red-600" />
                    </IconButton>
                  </div>
                </div>
                {/* This Dialog appears when user clicks on delete button */}
                <DeleteSecretDialog
                  setOpen={setOpenDelete}
                  open={openDelete}
                  secretName={selectedSecret}
                />
              </li>
            ))}
          </List>
        ) : (
          <p>You don&apos;t have any secrets yet</p>
        )}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const secrets = await fetcher<{ secrets: KubernetesSecret[] }>(
      '/core/secrets'
    )
    return { props: { secrets }, revalidate: 10 }
  } catch (e) {
    return { notFound: true }
  }
}

export default KubernetesSecrets
