// COntext
import { useGetGlobalContext } from '../../context/GlobalContext/useContext'
import { LIBS_PROVIDER } from '../../config/web3'

import styles from './styles.module.scss'

function LibSelector() {
  const { currentLib, setCurrentLib } = useGetGlobalContext()
  return (
    <div className={`flex space-x-1 rounded-lg bg-slate-100 p-0.5 ${styles.lib_selector}`}>
      {LIBS_PROVIDER.map(lib => (
        <button
          key={lib}
          className={lib === currentLib
            ? 'flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3 bg-white shadow'
            : 'flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3'}
          type='button'
          onClick={() => setCurrentLib(lib)}>
          <span className={lib === currentLib
            ? 'sr-only lg:not-sr-only lg:ml-2 text-slate-900'
            : 'sr-only lg:not-sr-only lg:ml-2 text-slate-600'}>
            {lib.charAt(0).toUpperCase() + lib.slice(1)}
          </span>
        </button>
      ))}
    </div>
  )
}

export default LibSelector
