import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { joiResolver } from '@hookform/resolvers/joi'
import { mutate } from 'swr'

import Button from '@components/atoms/Button/Button'
import Select from '@components/molecules/Select/Select'
import { clientOptions } from '@data/ethereum2/beaconNode/clientOptions'
import { updateBeaconNode } from '@utils/requests/ethereum2/beaconNodes'
import { updateClientSchema } from '@schemas/ethereum2/beaconNode/updateBeaconNode'
import {
  Ethereum2BeaconNode,
  MutableEthereum2BeaconNode,
} from '@interfaces/ethereum2/beaconNode/Ethereum2BeaconNode'
import TextInputWithButton from '@components/molecules/TextInputWithButton/TextInputWithButton'

interface Props {
  beaconnode: Ethereum2BeaconNode
}

const BeaconNodeEthereumTab: React.FC<Props> = ({ beaconnode }) => {
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')
  const { name, eth1Endpoints } = beaconnode
  console.log(eth1Endpoints)

  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<MutableEthereum2BeaconNode>({
    defaultValues: { eth1Endpoints },
    // resolver: joiResolver(updateClientSchema),
  })

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError('')
    setSubmitSuccess('')
    console.log(values)
    // try {
    //   const beaconnode = await updateBeaconNode(name, values)
    //   mutate(name, beaconnode)
    //   reset({ client: beaconnode.client })
    //   setSubmitSuccess('Beacon node has been updated')
    // } catch (e) {
    //   setSubmitError(e.response.data.error)
    // }
  })

  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        <TextInputWithButton name="sad" value="my-ethereum-node:1234" />
      </div>

      <div className="flex space-x-2 space-x-reverse flex-row-reverse items-center px-4 py-3 bg-gray-50 sm:px-6">
        <Button
          className="btn btn-primary"
          disabled={!isDirty || isSubmitting}
          loading={isSubmitting}
          onClick={onSubmit}
        >
          Save
        </Button>
        {submitError && (
          <p className="text-center text-red-500 mb-5">{submitError}</p>
        )}
        {submitSuccess && <p>{submitSuccess}</p>}
      </div>
    </>
  )
}

export default BeaconNodeEthereumTab
