import { useContext } from 'react'

// Context
import GlobalContext from '../../context/GlobalContext'

const useLoader = () => {
  const { loader, setLoader } = useContext(GlobalContext)
  return { loader, setLoader }
}

export default useLoader