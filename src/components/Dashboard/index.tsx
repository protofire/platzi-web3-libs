import { useState, useCallback, useEffect } from 'react'
import { MdCheck, MdClose } from 'react-icons/md'

export const Dashboard = ({selectedLibrary} : any) => {

  const [voteNo, setVoteNo] = useState(0)
  const [voteYes, setVoteYes] = useState(0)
  const [totalVotes, setTotalVotes] = useState(0)

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
    <>
      <div className="flex justify-center flex-wrap md:justify-between">
        <div className="flex items-center justify-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
          <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            <MdClose />
          </div>
          <div className="ml-3 text-sm font-normal">Votes for No: </div>
          <div className="ml-3 text-sm font-normal px-1 border-2 border-slate-200/10">{voteNo}</div>
        </div>
        <div className="flex items-center justify-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white hover:bg-gray-800 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
          <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <MdCheck />
          </div>
          <div className="ml-3 text-sm font-normal">Votes for yes:</div>
          <div className="ml-3 mr-3 text-sm font-normal px-1 border-2 border-slate-200/10">{voteYes}</div>
        </div>
      </div>

      <div>
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lime-600 bg-red-200">
              No
              {` ${(voteNo/totalVotes*100).toFixed(2)}%`}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lime-600 bg-lime-200">
              Yes
              {` ${(voteYes/totalVotes*100).toFixed(2)}%`}
            </span>
            <span className="text-xs font-semibold inline-block text-lime-600">
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2.5 text-xs flex rounded">
          <div style={{"width":`${voteNo/totalVotes*100}%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
          <div style={{"width":`${voteYes/totalVotes*100}%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-lime-500"></div>
        </div>
      </div>
    </>
  )
}
