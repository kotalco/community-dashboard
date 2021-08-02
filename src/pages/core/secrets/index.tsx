import { useState } from 'react';
import { InferGetStaticPropsType } from 'next';
import { TrashIcon, KeyIcon } from '@heroicons/react/outline';
import { PlusIcon } from '@heroicons/react/solid';

import IconButton from '@components/atoms/IconButton/IconButton';
import Heading from '@components/templates/Heading/Heading';
import Button from '@components/atoms/Button/Button';
import Layout from '@components/templates/Layout/Layout';
import List from '@components/organisms/List/List';
import DeleteSecretDialog from '@components/organisms/KubernetesSecrets/DeleteSecretDialog/DeleteSecretDialoge';
import { useSecrets } from '@utils/requests/secrets';
import { KubernetesSecret } from '@interfaces/KubernetesSecret/KubernetesSecret';
import { fetcher } from '@utils/axios';

const KubernetesSecrets = ({
  secrets,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data } = useSecrets({ initialData: { secrets } });
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedSecret, setSelectedSecret] = useState('');

  const confirmDelete = (secretName: string) => {
    setOpenDelete(true);
    setSelectedSecret(secretName);
  };

  return (
    <Layout>
      <Heading title="Secrets">
        {!!data?.length && (
          <Button href="/core/secrets/create" className="btn btn-primary">
            Create New Secret
          </Button>
        )}
      </Heading>

      <div className="py-4">
        {data?.length ? (
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
              </li>
            ))}
          </List>
        ) : (
          <div className="text-center bg-white py-6 rounded-tr-md rounded-b-md">
            <KeyIcon className="mx-auto w-12 h-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No Secrets
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new secret.
            </p>
            <div className="mt-6">
              <Button href="/core/secrets/create" className="btn btn-primary">
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Create New Secret
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* This Dialog appears when user clicks on delete button */}
      <DeleteSecretDialog
        setOpen={setOpenDelete}
        open={openDelete}
        secretName={selectedSecret}
      />
    </Layout>
  );
};

export const getStaticProps = async () => {
  const { secrets } = await fetcher<{ secrets: KubernetesSecret[] }>(
    '/core/secrets'
  );
  return { props: { secrets }, revalidate: 10 };
};

export default KubernetesSecrets;
