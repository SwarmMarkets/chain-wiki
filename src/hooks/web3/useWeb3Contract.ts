import { SmartContract, useContract } from '@thirdweb-dev/react';
import { BaseContract, ContractInterface } from 'ethers';
import { useState } from 'react';

type Contract<C extends BaseContract = BaseContract> = SmartContract<C>

type CallMethodsParam<C extends BaseContract> = Parameters<Contract<C>['call']>[0]
type CallArgumentsParam<C extends BaseContract> = Parameters<Contract<C>['call']>[1]

export const useWeb3Contract = <C extends BaseContract>(contractAddress: string, abi: ContractInterface) => {
  const [txLoading, setTxLoading] = useState(false)
  const [isTxError, setIsTxError] = useState(false)
  const [result, setResult] = useState()
  const { contract, ...rest } = useContract(contractAddress, abi)

  const call = async (method: CallMethodsParam<C>, args: CallArgumentsParam<C>) => {
    try {
      setIsTxError(false)
      setTxLoading(true)
      const res = await contract?.call(method, args)
      setResult(res)
      
      console.log(res)
    } catch (e) {
      setIsTxError(true)
      console.log(e)
    } finally {
      setTxLoading(false)
    }
  }

  return {
    contract: contract as unknown as C ,
    contractState: rest,
    call,
    result,
    isTxError,
    txLoading,
  }
}