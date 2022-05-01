import { useEffect } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';

import Layout from '@components/templates/Layout/Layout';
import Heading from '@components/templates/Heading/Heading';
import TextInput from '@components/molecules/TextInput/TextInput';
import Select from '@components/molecules/Select/Select';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import Textarea from '@components/molecules/Textarea/Textarea';
import FileInput from '@components/molecules/FileInput/FileInput';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import Button from '@components/atoms/Button/Button';
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

const CreateSecret: React.FC<React.PropsWithChildren<unknown>> = () => {
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
    setError,
    clearErrors,
    formState: { errors, isSubmitted, isValid, isSubmitting, isDirty },
  } = useForm<CreateKubernetesSecret>();
  const type = watch('type');

  useEffect(() => {
    if (secretTypeQuery) reset({ type: secretTypeQuery });
  }, [reset, secretTypeQuery]);

  const onSubmit: SubmitHandler<CreateKubernetesSecret> = async (values) => {
    if (values.data['tls/crt'] && values.data['tls/key']) {
      values.data['tls.crt'] = values.data['tls/crt'];
      values.data['tls.key'] = values.data['tls/key'];
      delete values.data['tls/crt'];
      delete values.data['tls/key'];
    }

    const { response } = await handleRequest(
      () => createSecret(values),
      setError
    );

    if (response) {
      router.push('/core/secrets');
    }
  };

  return (
    <Layout>
      <Heading title="Create New Secret" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout>
          <TextInput
            label="Secret Name"
            error={errors.name?.message}
            {...register('name', nameValidations)}
          />

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
            type === KubernetesSecretTypes.polkadotPrivatekey ||
            type === KubernetesSecretTypes.nearPrivateKey) && (
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

export default CreateSecret;
