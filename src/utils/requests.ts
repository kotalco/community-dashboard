import axios from './axios'
import { EthereumNode, AxiosGetAllResponse } from '@interfaces/Node'

export const getAllNodes = async (protocol = ''): Promise<EthereumNode[]> => {
  const { data } = await axios.get<AxiosGetAllResponse>(`/${protocol}/nodes`)
  return data.nodes
}
