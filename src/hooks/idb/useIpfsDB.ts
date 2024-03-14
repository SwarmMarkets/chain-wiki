import IndexedDB, { IEntity } from '@src/services/idb'
import useIndexedDB from './useIndexedDB'
import {
  IpfsTokenContent,
  IpfsProjectContent,
  IpfsVoteProposal,
} from '@src/shared/types/ipfs'

interface IPFSContent extends IEntity {
  content: IpfsProjectContent | IpfsVoteProposal | IpfsTokenContent
}

const ipfsDb = new IndexedDB<IPFSContent>('ipfsDatabase', 'ipfsContent')

const useIpfsDB = () => {
  const dbState = useIndexedDB<IPFSContent>(ipfsDb)
  return dbState
}

export default useIpfsDB
