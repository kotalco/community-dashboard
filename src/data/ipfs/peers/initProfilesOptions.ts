import { IPFSConfigurationProfile } from '@enums/IPFS/Peers/IPFSConfigurationProfile'

type Profiles = { label: string; value: IPFSConfigurationProfile }[]

export const initProfilesOptions: Profiles = [
  { label: 'server', value: IPFSConfigurationProfile.server },
  { label: 'randomports', value: IPFSConfigurationProfile.randomports },
  {
    label: 'default-datastore',
    value: IPFSConfigurationProfile.defaultDatastore,
  },
  { label: 'local-discovery', value: IPFSConfigurationProfile.localDiscovery },
  { label: 'test', value: IPFSConfigurationProfile.test },
  {
    label: 'default-networking',
    value: IPFSConfigurationProfile.defaultNetworking,
  },
  { label: 'flatfs', value: IPFSConfigurationProfile.flatfs },
  { label: 'badgerds', value: IPFSConfigurationProfile.badgerds },
  { label: 'lowpower', value: IPFSConfigurationProfile.lowpower },
]
