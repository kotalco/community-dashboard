import React, { useState } from 'react';
import { TrashIcon, KeyIcon } from '@heroicons/react/outline';

import IconButton from '@components/atoms/IconButton/IconButton';
import Heading from '@components/templates/Heading/Heading';
import Button from '@components/atoms/Button/Button';
import Layout from '@components/templates/Layout/Layout';
import List from '@components/organisms/List/List';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import EmptyState from '@components/molecules/EmptyState/EmptyState';
import LoadMoreButton from '@components/atoms/LoadMoreButton/LoadMoreButton';
import DeleteSecretDialog from '@components/organisms/KubernetesSecrets/DeleteSecretDialog/DeleteSecretDialoge';
import { useSecrets } from '@hooks/useSecrets';
import { getLabel } from '@utils/helpers/getLabel';
import { secretTypesOptions } from '@data/kubernetesSecrets/secretTypesOptions';

function KubernetesSecrets() {
  const {
    secrets,
    isEmpty,
    isInitialLoading,
    size,
    setSize,
    isReachedEnd,
    isLoading,
  } = useSecrets();

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedSecret, setSelectedSecret] = useState('');

  const confirmDelete = (secretName: string) => {
    setOpenDelete(true);
    setSelectedSecret(secretName);
  };

  if (isInitialLoading) {
    return <LoadingIndicator />;
  }

  if (isEmpty) {
    return (
      <Layout>
        <Heading title="Secrets" />
        <div className="py-4">
          <EmptyState
            title="There is no secrets created"
            description="Get started by creating a new secret."
            linkUrl="/core/secrets/create"
            linkName="Create New Secret"
          >
            <KeyIcon className="mx-auto w-12 h-12 text-gray-400" />
          </EmptyState>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading title="Secrets">
        <Button href="/core/secrets/create" className="btn btn-primary">
          Create New Secret
        </Button>
      </Heading>

      <div className="py-4">
        <List>
          {secrets.map(({ name, type }) => (
            <li key={name}>
              <div className="group p-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <div className="flex text-sm font-medium text-gray-900 truncate">
                      {name}
                    </div>
                    <div className="mt-2 flex">
                      <div className="flex items-center text-sm text-gray-500">
                        {getLabel(type, secretTypesOptions)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
                  <IconButton onClick={() => confirmDelete(name)}>
                    <TrashIcon className="h-5 w-5 text-red-600" />
                  </IconButton>
                </div>
              </div>
            </li>
          ))}
        </List>
        {!isReachedEnd && (
          <LoadMoreButton
            onChange={() => setSize(size + 1)}
            isLoading={isLoading}
          />
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
}

export default KubernetesSecrets;
