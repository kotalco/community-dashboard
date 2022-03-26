import React, { useState } from 'react';
import Error from 'next/error';
import { TrashIcon, KeyIcon } from '@heroicons/react/outline';

import IconButton from '@components/atoms/IconButton/IconButton';
import Heading from '@components/templates/Heading/Heading';
import Button from '@components/atoms/Button/Button';
import Layout from '@components/templates/Layout/Layout';
import List from '@components/organisms/List/List';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import EmptyState from '@components/molecules/EmptyState/EmptyState';
import LoadMoreButton from '@components/atoms/LoadMoreButton/LoadMoreButton';
import useInfiniteRequest from '@hooks/useInfiniteRequest';
import DeleteSecretDialog from '@components/organisms/KubernetesSecrets/DeleteSecretDialog/DeleteSecretDialoge';
import { getLabel } from '@utils/helpers/getLabel';
import { secretTypesOptions } from '@data/kubernetesSecrets/secretTypesOptions';
import { useModal } from '@hooks/useModal';
import { KubernetesSecret } from '@interfaces/KubernetesSecret/KubernetesSecret';

function KubernetesSecrets() {
  const {
    data: secrets,
    isEmpty,
    isInitialLoading,
    size,
    setSize,
    isReachedEnd,
    isLoading,
    error,
  } = useInfiniteRequest<KubernetesSecret>('/core/secrets');

  const { isOpen, open, close } = useModal();
  const [selectedSecret, setSelectedSecret] = useState('');

  const confirmDelete = (secretName: string) => {
    open();
    setSelectedSecret(secretName);
  };

  if (isInitialLoading) {
    return <LoadingIndicator />;
  }

  if (error) return <Error statusCode={500} />;

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
            <KeyIcon className="w-12 h-12 mx-auto text-gray-400" />
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
              <div className="flex items-center p-4 group sm:px-6">
                <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <div className="flex text-sm font-medium text-gray-900 truncate">
                      {name}
                    </div>
                    <div className="flex mt-2">
                      <div className="flex items-center text-sm text-gray-500">
                        {getLabel(type, secretTypesOptions)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-5 transition-opacity opacity-0 shrink-0 group-hover:opacity-100">
                  <IconButton onClick={() => confirmDelete(name)}>
                    <TrashIcon className="w-5 h-5 text-red-600" />
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
        close={close}
        isOpen={isOpen}
        secretName={selectedSecret}
      />
    </Layout>
  );
}

export default KubernetesSecrets;
