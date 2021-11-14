import { useState } from 'react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { joiResolver } from '@hookform/resolvers/joi';

import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import TextInput from '@components/molecules/TextInput/TextInput';
import Checkbox from '@components/molecules/CheckBox/CheckBox';
import { createIPFSPeer } from '@utils/requests/ipfs/peers';
import { schema } from '@schemas/ipfs/peers/createIPFSPeer';
import { CreatePeer, Peer } from '@interfaces/ipfs/Peer';
import { IPFSConfigurationProfile } from '@enums/IPFS/Peers/IPFSConfigurationProfile';
import { initProfilesOptions } from '@data/ipfs/peers/initProfilesOptions';
import { handleRequest } from '@utils/helpers/handleRequest';

const CreateIPFSPeerPage: React.FC = () => {
  const [serverError, setServerError] = useState('');
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitted, isValid, isSubmitting },
  } = useForm<CreatePeer>({
    resolver: joiResolver(schema),
    defaultValues: {
      initProfiles: [IPFSConfigurationProfile.defaultDatastore],
    },
  });

  const onSubmit: SubmitHandler<CreatePeer> = async (values) => {
    setServerError('');
    const { error, response } = await handleRequest<Peer>(
      createIPFSPeer.bind(undefined, values)
    );

    if (error) {
      setServerError(error);
      return;
    }

    if (response) {
      localStorage.setItem('peer', response.name);
      router.push('/deployments/ipfs/peers');
    }
  };

  const initProfilesError = errors.initProfiles as FieldError | undefined;

  return (
    <Layout>
      <h1 className="text-2xl font-semibold">Create New Peer</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout
          error={serverError}
          isSubmitted={isSubmitted}
          isSubmitting={isSubmitting}
          isValid={isValid}
        >
          <div className="px-4 py-5 sm:p-6">
            {/* Peer Name */}
            <TextInput
              control={control}
              name="name"
              label="Peer Name"
              defaultValue=""
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
