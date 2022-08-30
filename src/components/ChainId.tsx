import { useCustomWeb3React } from '../hooks'

function ChainId() {
  const { chainId } = useCustomWeb3React()

  return (
    <>
      <span>Chain Id</span>
      <span role="img" aria-label="chain">
        ⛓
      </span>
      <span>{chainId ?? ''}</span>
    </>
  )
}

export default ChainId
