import useSWR from 'swr'

import { fetcher } from '@utils/axios'
import { IPFSClusterPeer } from '@interfaces/ipfs/IPFSClusterPeer'

/**
 * Hook that get all cluster peers from the server
 * @param initialClusterPeers if present
 * @returns object with all cluster peers or undefined if error then isError is true
 */
export const useClusterPeers = (initialClusterPeers?: {
  clusterpeers: IPFSClusterPeer[]
}): { clusterpeers?: IPFSClusterPeer[]; isError: boolean } => {
  const { data, error } = useSWR<{ clusterpeers: IPFSClusterPeer[] }>(
    '/ipfs/clusterpeers',
    fetcher,
    { initialData: initialClusterPeers, revalidateOnMount: true }
  )

  return { clusterpeers: data?.clusterpeers, isError: !!error }
}
