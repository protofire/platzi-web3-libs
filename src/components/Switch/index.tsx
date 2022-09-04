import { useEffect } from 'react'

export const Switch = ({switchLibrary, setSwitchLibrary} : any) => {

  const doSwitch = () => {
    setSwitchLibrary(!switchLibrary)
    if (switchLibrary){
      localStorage.setItem('librarySelected', 'ethers')
    } else {
      localStorage.setItem('librarySelected', 'web3')
    }
  }
  useEffect(() => {
    const libraryStorage = localStorage.getItem('librarySelected')
    if (!libraryStorage) {
       localStorage.setItem('librarySelected', 'web3')
    }
  }, [])

  return (
    <label className="inline-flex relative items-center cursor-pointer my-5">
      <input type="checkbox" value="" checked={switchLibrary} onChange={doSwitch} id="default-toggle" className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{switchLibrary ? 'Web3.js' : 'EthersJs'}</span>
    </label>
  )
}
