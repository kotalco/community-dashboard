import { array, mixed, object, SchemaOf, string } from 'yup';

import { CreatePeer } from '@interfaces/ipfs/Peer';
import { nameRegex } from '@utils/helpers/regex';
import { IPFSConfigurationProfile } from '@enums/IPFS/Peers/IPFSConfigurationProfile';

export const schema: SchemaOf<CreatePeer> = object({
  name: string()
    .required('Name is required')
    .trim()
    .matches(nameRegex, 'Spaces not allowed'),
  initProfiles: array()
    .min(1, 'Initial configration profiles are required')
    .of(
      mixed()
        .required()
        .oneOf([
          IPFSConfigurationProfile.server,
          IPFSConfigurationProfile.randomports,
          IPFSConfigurationProfile.defaultDatastore,
          IPFSConfigurationProfile.localDiscovery,
          IPFSConfigurationProfile.test,
          IPFSConfigurationProfile.defaultNetworking,
          IPFSConfigurationProfile.flatfs,
          IPFSConfigurationProfile.badgerds,
          IPFSConfigurationProfile.lowpower,
        ])
    ),
});
