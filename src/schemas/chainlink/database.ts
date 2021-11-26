import { string, SchemaOf, object } from 'yup';

import { Database } from '@interfaces/chainlink/ChainlinkNode';

export const databaseSchema: SchemaOf<Database> = object({
  databaseURL: string()
    .required('Database connection URL is required')
    .trim()
    .matches(/postgres:\/\//, 'Invalid database URL'),
});
