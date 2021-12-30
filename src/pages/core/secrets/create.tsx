import { useEffect, useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';

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
import { handleRequest } from '@utils/helpers/handleRequest';

const CreateSecret: React.FC = () => {
  const [serverError, setServerError] = useState('');
  const router = useRouter();
  const secretTypeQuery = router.query.type as
    | KubernetesSecretTypes
    | undefined;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isSubmitted, isValid, isSubmitting },
  } = useForm<CreateKubernetesSecret>();
  const type = watch('type');

  useEffect(() => {
    if (secretTypeQuery) reset({ type: secretTypeQuery });
  }, [reset, secretTypeQuery]);

  const onSubmit: SubmitHandler<CreateKubernetesSecret> = async (values) => {
    setServerError('');
    if (values.data['tls/crt'] && values.data['tls/key']) {
      values.data['tls.crt'] = values.data['tls/crt'];
      values.data['tls.key'] = values.data['tls/key'];
      delete values.data['tls/crt'];
      delete values.data['tls/key'];
    }

    const { error } = await handleRequest(createSecret.bind(undefined, values));

    if (error) {
      setServerError(error);
      return;
    }

    router.push('/core/secrets');
  };

  return (
    <Layout>
      <Heading title="Create New Secret" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout
          isSubmitted={isSubmitted}
          isSubmitting={isSubmitting}
          isValid={isValid}
          error={serverError}
        >
          <TextInput
            label="Secret Name"
            error={errors.name?.message}
            {...register('name', nameValidations)}
          />

          <div className="max-w-xs mt-4">
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
                  value={field.value}
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
            type === KubernetesSecretTypes.ipfsSwarmKey ||
            type === KubernetesSecretTypes.polkadotPrivatekey) && (
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

          {type === KubernetesSecretTypes.tlsCertificate && (
            <>
              <Textarea
                label="TLS Key"
                {...register('data.tls/key')}
                error={errors.data?.['tls/key']?.message}
              ></Textarea>
              <Textarea
                label="TLS Certificate"
                {...register('data.tls/crt', keyValidations)}
                error={errors.data?.['tls/crt']?.message}
              ></Textarea>
            </>
          )}
        </FormLayout>
      </form>
    </Layout>
  );
};

export default CreateSecret;
