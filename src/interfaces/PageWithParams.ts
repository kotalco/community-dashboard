import { AxiosResponse } from 'axios';
import { KeyedMutator } from 'swr';

export interface PageWithParams<T> {
  data: T;
  mutate: KeyedMutator<AxiosResponse<{ data: T }>>;
}
