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
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-green-400">Proposal Vote </span> Challenge.
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Welcome, you can enter with your Metamask wallet and vote yes or no.
        </p>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          The contract was deployed at Goerli Test Network, and you can review it here: 
        </p>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          <a className="text-gray-900 dark:text-gray-200" href="https://goerli.etherscan.io/address/0xacfc7725527ba2ee4311574f65e5d76f9f9585e9#code">
            {` Etherscan Proposal Platzi Challenge`}
          </a>
        </p>
        <p className="text-lg font-normal mt-4 text-gray-500 lg:text-xl dark:text-gray-400">
          Select your favorite <span className="font-semibold text-amber-300">web3</span> library
        </p>
      </div>

      <Switch switchLibrary={switchLibrary} setSwitchLibrary={setSwitchLibrary} />

      {
        active ?
          <Dashboard active={active} selectedLibrary={selectedLibrary} />
          :
          <p className="text-md">Connect your wallet</p>
      }
    </div>
  )
}
