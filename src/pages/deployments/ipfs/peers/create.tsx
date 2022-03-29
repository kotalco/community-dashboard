import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';

import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import TextInput from '@components/molecules/TextInput/TextInput';
import CheckboxGroup from '@components/molecules/CheckBoxGroup/CheckBoxGroup';
import Heading from '@components/templates/Heading/Heading';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import Button from '@components/atoms/Button/Button';
import { createIPFSPeer } from '@utils/requests/ipfs/peers';
import { schema } from '@schemas/ipfs/peers/createPeer';
import { CreatePeer } from '@interfaces/ipfs/Peer';
import { IPFSConfigurationProfile } from '@enums/IPFS/Peers/IPFSConfigurationProfile';
import { initProfilesOptions } from '@data/ipfs/peers/initProfilesOptions';
import { handleRequest } from '@utils/helpers/handleRequest';
import { Deployments } from '@enums/Deployments';
import { NotificationInfo } from '@interfaces/NotificationInfo';

const CreateIPFSPeerPage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitted, isValid, isSubmitting, isDirty },
  } = useForm<CreatePeer>({
    resolver: yupResolver(schema),
    defaultValues: {
      initProfiles: [IPFSConfigurationProfile.defaultDatastore],
    },
  });

  const onSubmit: SubmitHandler<CreatePeer> = async (values) => {
    const { response } = await handleRequest(
      () => createIPFSPeer(values),
      setError
    );

    if (response) {
      const notification: NotificationInfo = {
        title: 'IPFS Peer has been created',
        message:
          'Peer has been created successfully, and will be up and running in few seconds.',
        deploymentName: response.name,
      };
      localStorage.setItem(Deployments.peer, JSON.stringify(notification));
      router.push('/deployments/ipfs/peers');
    }
  };

  const initProfilesError = errors.initProfiles as FieldError | undefined;

  return (
    <Layout>
      <Heading title="Create New Peer" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout>
          {/* Peer Name */}
          <TextInput
            label="Peer Name"
            error={errors.name?.message}
            {...register('name')}
          />

          {/* <!-- configuration profiles --> */}
          <CheckboxGroup
            options={initProfilesOptions}
            label="Initial Configuration Profiles:"
            error={initProfilesError?.message}
            {...register('initProfiles')}
          />

          <ErrorSummary errors={errors} />

          <div className="flex flex-row-reverse items-center px-4 py-3 mt-5 -mx-6 -mb-6 bg-gray-50 sm:px-6">
            <Button
              type="submit"
              className="btn btn-primary"
              disabled={(isSubmitted && !isValid) || isSubmitting || !isDirty}
              loading={isSubmitting}
              onClick={() => clearErrors()}
            >
              Create
            </Button>
          </div>
        </FormLayout>
      </form>
    </Layout>
  );
};

export default CreateIPFSPeerPage;
