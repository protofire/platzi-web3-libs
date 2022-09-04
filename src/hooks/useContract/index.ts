import { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from '@ethersproject/contracts'

// Arifacts
import contract from '../../config/web3/artifacts/contract'

// Context
import { useGetGlobalContext } from '../../context/GlobalContext/useContext'

const { address, abi } = contract

const useContract = () => {
  const { currentLib } = useGetGlobalContext()
  const { active, library, chainId } = useWeb3React()

  const contract = useMemo(() => {
    if (active && chainId) return currentLib === 'ethers'
      ? new Contract((address as any)[chainId], abi, library.getSigner())
      : new library.eth.Contract(abi, (address as any)[chainId])
  }, [active, chainId, library?.eth?.Contract])

  const read = async (method: string, args: any[] = []) => {
    const bnToDec = (val: any) => typeof val === 'object'
      ? (val._isBigNumber ? Number(val) : val) : val
    if (contract) return bnToDec(currentLib === 'ethers'
      ? (await contract[method](...args))
      : await contract.methods[method](...args).call())
  }

  return { contract, read }
}

export default useContract
