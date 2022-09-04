import { useMemo, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from '@ethersproject/contracts'
import { parseEther } from '@ethersproject/units'

// Arifacts
import contract from '../../config/web3/artifacts/contract'

// Context
import { useGetGlobalContext } from '../../context/GlobalContext/useContext'

// Types
import { ISend } from '../../interfaces/contract.interface'

const { address, abi } = contract

export const useContract = () => {
  const { currentLib, setLoading } = useGetGlobalContext()
  const { active, library, chainId } = useWeb3React()
  const [subscribtions, setSubscriptions] = useState(null)

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

  const send = async (method: string, args: any[] = [], send: ISend = {}) => {
    let res = null
    setLoading(true)
    if (contract) res = currentLib === 'ethers'
      ? (await contract[method](...args, { ...send, value: parseEther(send.value.toString()) }))
      : await new Promise((res) => contract.methods[method](...args)
        .send({ ...send, value: send.value * Math.pow(10, 18) })
        .on('receipt', (result: any) => res(result))
        .on('error', () => res(null)))
    setLoading(false)
    return res
  }

  const events = (event: string, cb: () => void) => {
    if (contract) setSubscriptions(currentLib === 'ethers'
      ? contract.on(event, cb)
      : contract.events[event](null, cb))
    return subscribtions
  }

  const unsubscribe = (event: string) => {
    if (subscribtions) return (subscribtions as any).removeAllListeners(event)
  }

  return { contract, read, send, events, unsubscribe }
}
