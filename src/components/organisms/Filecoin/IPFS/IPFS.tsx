import { useState } from 'react';
import { KeyedMutator } from 'swr';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import Toggle from '@components/molecules/Toggle/Toggle';
import SelectWithInput from '@components/molecules/SelectWithInput/SelectWithInput';
import { IPFS } from '@interfaces/filecoin/FilecoinNode';
import { handleRequest } from '@utils/helpers/handleRequest';
import { FilecoinNode } from '@interfaces/filecoin/FilecoinNode';
import { updateFilecoinNode } from '@utils/requests/filecoin';
import { usePeers } from '@hooks/usePeers';

interface Props extends FilecoinNode {
  mutate?: KeyedMutator<{ node: FilecoinNode }>;
}

function IPFSDetails({
  ipfsForRetrieval,
  ipfsOnlineMode,
  ipfsPeerEndpoint,
  name,
  mutate,
}: Props) {
  const [serverError, setServerError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const { peers, isLoading } = usePeers();
  const peersOptions = peers.map(({ name }) => ({
    label: name,
    value: `/dns4/${name}/tcp/5001`,
  }));

  const {
    handleSubmit,
    reset,
    control,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<IPFS>();

  const onSubmit: SubmitHandler<IPFS> = async (values) => {
    setSubmitSuccess('');
    setServerError('');
    const { error, response } = await handleRequest<FilecoinNode>(
      updateFilecoinNode.bind(undefined, values, name)
    );

    if (error) {
      setServerError(error);
      return;
    }

    if (response) {
      mutate?.();
      reset(response);
      setSubmitSuccess('IPFS data has been updated');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        {/* IPFS For Retrieval */}
        <Controller
          control={control}
          name="ipfsForRetrieval"
          defaultValue={ipfsForRetrieval}
          render={({ field }) => (
            <Toggle
              label="Use IPFS For Retrieval"
              checked={field.value}
              onChange={field.onChange}
              error={errors.ipfsForRetrieval?.message}
            />
          )}
        />

        {/* IPFS Online Mode */}
        <Controller
          control={control}
          name="ipfsOnlineMode"
          defaultValue={ipfsOnlineMode}
          render={({ field }) => (
            <Toggle
              label="IPFS Online Mode"
              checked={field.value}
              onChange={field.onChange}
              error={errors.ipfsOnlineMode?.message}
            />
          )}
        />

        {/* IPFS Peer Endpoint */}
        {!isLoading && (
          <Controller
            control={control}
            name="ipfsPeerEndpoint"
            defaultValue={ipfsPeerEndpoint}
            render={({ field }) => (
              <SelectWithInput
                options={peersOptions}
                placeholder="Select a peer..."
                label="IPFS Peer Endpoint"
                value={field.value}
                onChange={field.onChange}
                name={field.name}
                error={errors.ipfsPeerEndpoint?.message}
                otherLabel="Use External Peer"
                withClear
              />
            )}
          />
        )}
      </div>

      <div className="flex flex-row-reverse items-center px-4 py-3 space-x-2 space-x-reverse bg-gray-50 sm:px-6">
        <Button
          type="submit"
          className="btn btn-primary"
          disabled={!isDirty || isSubmitting}
          loading={isSubmitting}
        >
          Save
        </Button>
        {submitSuccess && <p>{submitSuccess}</p>}
        {serverError && (
          <p aria-label="alert" className="text-sm text-red-600">
            {serverError}
          </p>
        )}
      </div>
    </form>
  );
}

export default IPFSDetails;
