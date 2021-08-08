import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { joiResolver } from '@hookform/resolvers/joi';

import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import TextInput from '@components/molecules/TextInput/TextInput';
import Checkbox from '@components/molecules/CheckBox/CheckBox';
import { createIPFSPeer } from '@utils/requests/ipfs/peers';
import { schema } from '@schemas/ipfs/peers/createIPFSPeer';
import { CreateIPFSPeer } from '@interfaces/ipfs/IPFSPeer';
import { IPFSConfigurationProfile } from '@enums/IPFS/Peers/IPFSConfigurationProfile';
import { initProfilesOptions } from '@data/ipfs/peers/initProfilesOptions';
import { useNotification } from '@components/contexts/NotificationContext';
import axios from 'axios';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';

const CreateIPFSPeerPage: React.FC = () => {
  const { createNotification } = useNotification();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitted, isValid, isSubmitting },
  } = useForm<CreateIPFSPeer>({
    resolver: joiResolver(schema),
    defaultValues: {
      initProfiles: [IPFSConfigurationProfile.defaultDatastore],
    },
  });

  /**
   * Submit create IPFS Peer from
   * @param values the data required to create new peer
   */
  const onSubmit: SubmitHandler<CreateIPFSPeer> = async (values) => {
    try {
      const peer = await createIPFSPeer(values);
      createNotification({
        title: 'IPFS Peer has been created',
        protocol: 'peer',
        name: peer.name,
        action:
          'created successfully, and will be up and running in few seconds.',
      });
      void router.push('/deployments/ipfs/peers');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = handleAxiosError<ServerError>(e);
        setError('name', {
          type: 'server',
          message: error.response?.data.error,
        });
      }
    }
  };

  const initProfilesError = errors.initProfiles as FieldError | undefined;

  return (
    <Layout>
      <h1 className="text-2xl font-semibold">Create New Peer</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout
          isSubmitted={isSubmitted}
          isSubmitting={isSubmitting}
          isValid={isValid}
        >
          <div className="px-4 py-5 sm:p-6">
            {/* Peer Name */}
            <TextInput
              {...register('name')}
              label="Peer Name"
              error={errors.name?.message}
            />

            {/* <!-- configuration profiles --> */}
            <div className="mt-4">
              <p className="block text-sm font-medium text-gray-700">
                Initial Configuration Profiles:
              </p>
              <div className="ml-5 max-w-lg space-y-2 mt-1">
                {initProfilesOptions.map(({ label, value }) => (
                  <Checkbox
                    key={value}
                    label={label}
                    value={value}
                    {...register('initProfiles')}
                  />
                ))}
              </div>
            </div>
            <p className="text-red-500 text-sm mt-2">
              {initProfilesError?.message}
            </p>
          </div>
        </FormLayout>
      </form>
    </Layout>
  );
};

export default CreateIPFSPeerPage;
