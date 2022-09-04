import { Wallet } from "../Wallet"
import './styles.css'

export const Header = () => {
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-700">
      <div className="container flex flex-wrap justify-center flex-col md:flex-row md:justify-between items-center mx-auto">
        <a href="https://github.com/fkmurphy" className="flex items-center">
            <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">Platzi - Challenge</span>
        </a>
        <div className="flex items-center">
          <Wallet />
        </div>
      </div>
    </nav>
  )

}
