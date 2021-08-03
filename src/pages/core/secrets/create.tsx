import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';

import Layout from '@components/templates/Layout/Layout';
import Heading from '@components/templates/Heading/Heading';
import TextInput from '@components/molecules/TextInput/TextInput';
import Select from '@components/molecules/Select/Select';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import Textarea from '@components/molecules/Textarea/Textarea';
import FileInput from '@components/molecules/FileInput/FileInput';
import { CreateKubernetesSecret } from '@interfaces/KubernetesSecret/KubernetesSecret';
import { secretTypesOptions } from '@data/kubernetesSecrets/secretTypesOptions';
import {
  nameValidations,
  typeValidations,
  passwordValidations,
  keyValidations,
  keystoreValidations,
} from '@schemas/kubernetesSecrets/createKubernetesSecret';
import { createSecret } from '@utils/requests/secrets';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';

const CreateSecret: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    control,
    formState: { errors, isSubmitted, isValid, isSubmitting },
  } = useForm<CreateKubernetesSecret>();
  const type = watch('type');

  const onSubmit: SubmitHandler<CreateKubernetesSecret> = async (values) => {
    try {
      await createSecret(values);
      void router.push('/core/secrets');
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

  return (
    <Layout>
      <Heading title="Create New Secret" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout
          isSubmitted={isSubmitted}
          isSubmitting={isSubmitting}
          isValid={isValid}
        >
          <TextInput
            label="Secret Name"
            error={errors.name?.message}
            {...register('name', nameValidations)}
          />

          <div className="mt-4 max-w-xs">
            <Controller
              name="type"
              rules={typeValidations}
              control={control}
              render={({ field }) => (
                <Select
                  placeholder="Choose a type..."
                  label="Secret Type"
                  error={errors.type?.message}
                  options={secretTypesOptions}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          {(type === KubernetesSecretTypes.password ||
            type === KubernetesSecretTypes.ethereum2Keystore) && (
            <div className="mt-4">
              <TextInput
                label="Password"
                type="password"
                error={errors.data?.password?.message}
                {...register('data.password', passwordValidations)}
              />
            </div>
          )}

          {(type === KubernetesSecretTypes.ethereumPrivatekey ||
            type === KubernetesSecretTypes.ipfsClusterPeerPrivatekey ||
            type === KubernetesSecretTypes.ipfsSwarmKey) && (
            <div className="mt-4">
              <Textarea
                label="Key"
                {...register('data.key', keyValidations)}
                error={errors.data?.key?.message}
              ></Textarea>
            </div>
          )}

          {type === KubernetesSecretTypes.ipfsClusterSecret && (
            <div className="mt-4">
              <Textarea
                label="Key"
                {...register('data.secret', keyValidations)}
                error={errors.data?.key?.message}
              ></Textarea>
            </div>
          )}

          {type === KubernetesSecretTypes.ethereum2Keystore && (
            <div className="mt-4">
              <Controller
                name="data.keystore"
                control={control}
                shouldUnregister={true}
                rules={keystoreValidations}
                render={({ field }) => (
                  <FileInput
                    label="Keystore"
                    error={errors.data?.keystore?.message}
                    {...field}
                  />
                )}
              />
            </div>
          )}
        </FormLayout>
      </form>
    </Layout>
  );
};

export default CreateSecret;
