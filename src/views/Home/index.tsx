import { useContext } from 'react'
import { LibraryContext } from "../../App"
import { Dashboard } from "../../components/Dashboard"
import { Switch } from "../../components/Switch"


export const Home = ({switchLibrary, setSwitchLibrary} : any) => {
  const { active, selectedLibrary } = useContext(LibraryContext)

  return (
    <div>
      <div className="my-2">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-green-400">Vote Proposal </span> Challenge.
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Welcome, try here the voting system for proposals. Select your favorite <span className="font-semibold">web3</span> library
        </p>
      </div>

      <Switch switchLibrary={switchLibrary} setSwitchLibrary={setSwitchLibrary} />

      {
        active ?
          <Dashboard active={active} selectedLibrary={selectedLibrary} />
          :
          <p className="">Connect your wallet</p>
      }
    </div>
  )
}
