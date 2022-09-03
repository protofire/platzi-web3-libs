import { useContext, useState } from 'react'

// Context
import GlobalContext from '.'
import { LIBS_PROVIDER } from '../../config/web3'

export const useGlobalContext = () => {
  const [currentLib, setCurrentLib] = useState(
    LIBS_PROVIDER[0]
  )

  return {
    currentLib,
    setCurrentLib
  }
}

export const useGetGlobalContext = () => useContext(GlobalContext)
