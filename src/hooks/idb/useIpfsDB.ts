import IndexedDB, { IEntity } from 'src/services/idb'
import useIndexedDB from './useIndexedDB'
import {
  IpfsTokenContent,
  IpfsNftContent,
  IpfsVoteProposal,
} from 'src/shared/utils/ipfs/types'

interface IPFSContent extends IEntity {
  id: string
  content: IpfsNftContent | IpfsVoteProposal | IpfsTokenContent
}

const ipfsDb = new IndexedDB<IPFSContent>('ipfsDatabase', 'ipfsContent', 'id')

const useIpfsDB = () => {
  const dbState = useIndexedDB<IPFSContent>(ipfsDb)
  return dbState
}

export default useIpfsDB
