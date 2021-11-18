import { useState } from 'react';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import TextInput from '@components/molecules/TextInput/TextInput';
import SelectWithInput from '@components/molecules/SelectWithInput/SelectWithInput';
import Select from '@components/molecules/SelectNew/SelectNew';
import Heading from '@components/templates/Heading/Heading';
import { clientOptions } from '@data/ethereum/node/clientOptions';
import { networkOptions } from '@data/ethereum/node/networkOptions';
import { createEthereumNode } from '@utils/requests/ethereum';
import { schema } from '@schemas/ethereum/createNode';
import { EthereumNode } from '@interfaces/Ethereum/ِEthereumNode';
import { CreateChainlinkNode } from '@interfaces/chainlink/ChainlinkNode';
import { useSecretsByType } from '@utils/requests/secrets';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { handleRequest } from '@utils/helpers/handleRequest';
import { EVM_CAINS } from '@data/chainlink/evmChain';

function CreateChainlink() {
  const [serverError, setServerError] = useState('');
  const router = useRouter();
  const { data: privateKeys } = useSecretsByType(
    KubernetesSecretTypes.ethereumPrivatekey
  );
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitted, isValid, isSubmitting },
  } = useForm<CreateChainlinkNode>();
  //   { resolver: yupResolver(schema) }

  const handleEVMChange = (value: { id: string; address: string }) => {
    setValue('ethereumChainId', value.id);
    setValue('linkContractAddress', value.address);
  };

  // eslint-disable-next-line @typescript-eslint/require-await
  const onSubmit: SubmitHandler<CreateChainlinkNode> = async (values) => {
    console.log(values);
    // setServerError('');
    // const { error, response } = await handleRequest<EthereumNode>(
    //   createEthereumNode.bind(undefined, values)
    // );

    // if (error) {
    //   setServerError(error);
    //   return;
    // }

    // if (response) {
    //   localStorage.setItem('node', response.name);
    //   router.push('/deployments/ethereum/nodes');
    // }
  };

  return (
    <Layout>
      <Heading title="Create New Chainlink Node" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout
          error={serverError}
          isSubmitted={isSubmitted}
          isSubmitting={isSubmitting}
          isValid={isValid}
        >
          {/* Node Name */}
          <TextInput
            control={control}
            name="name"
            id="name"
            type="text"
            label="Node Name"
            defaultValue=""
            error={errors.name?.message}
          />

          {/* EVM Chain */}
          <Select
            options={EVM_CAINS}
            label="EVM Chain"
            placeholder="Select a chain..."
            onChange={handleEVMChange}
          />
        </FormLayout>
      </form>
    </Layout>
  );
}

export default CreateChainlink;
