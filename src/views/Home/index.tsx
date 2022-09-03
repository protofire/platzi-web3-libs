import { useState, useCallback, useEffect, useContext } from 'react'
import { LibraryContext } from "../../App"
import { Switch } from "../../components/Switch"


export const Home = ({switchLibrary, setSwitchLibrary} : any) => {
  const [voteNo, setVoteNo] = useState(0)
  const [voteYes, setVoteYes] = useState(0)
  const [totalVotes, setTotalVotes] = useState(0)
  const { selectedLibrary } = useContext(LibraryContext)

  const getVotes = useCallback(async () => {
    if(selectedLibrary?.contract) {
      const votes = await selectedLibrary.getVotes()
      console.log('Votos response', votes)
      setVoteNo(votes.voteForNo)
      setVoteYes(votes.voteForYes)
      setTotalVotes(votes.voteForYes + votes.voteForNo)
    }
  }, [selectedLibrary])

  useEffect(() => {
    getVotes()
  },[getVotes])

  return (
    <div>
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-green-400">Vote Proposal </span> Challenge.
      </h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        Try here the voting system for proposals. Select your favorite <code>web3</code> library
      </p>

      <Switch switchLibrary={switchLibrary} setSwitchLibrary={setSwitchLibrary} />
      <div className="flex items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
          <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
          </div>
          <div className="ml-3 text-sm font-normal">Votes for yes:</div>
          <div className="ml-3 justify-between mr-3 text-sm font-normal px-1 border-2 border-slate-200/10">{voteYes}</div>
      </div>
      <div className="flex items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white hover:bg-gray-800 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
          <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </div>
        <div className="ml-3 text-sm font-normal">Votes for No: </div>
        <div className="ml-3 text-sm font-normal px-1 border-2 border-slate-200/10">{voteNo}</div>
      </div>

      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lime-600 bg-red-200">
              No
              {` ${voteNo/totalVotes*100}%`}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lime-600 bg-lime-200">
              Yes
              {` ${voteYes/totalVotes*100}%`}
            </span>
            <span className="text-xs font-semibold inline-block text-lime-600">
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-lime-200">
          <div style={{"width":`${voteNo/totalVotes*100}%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
          <div style={{"width":`${voteYes/totalVotes*100}%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-lime-500"></div>
        </div>
      </div>
    </div>
  )
}
