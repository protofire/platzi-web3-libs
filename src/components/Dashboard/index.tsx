import { useState, useCallback, useEffect } from 'react'
import {VoteButton} from '../VoteButton'

export const Dashboard = ({selectedLibrary} : any) => {

  const [voteNo, setVoteNo] = useState(0)
  const [voteYes, setVoteYes] = useState(0)
  const [totalVotes, setTotalVotes] = useState(0)
  const [ voting , setVoting ] = useState(false) 

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
    <div className="my-8">
      <div className="flex justify-center flex-wrap md:justify-between">
          <VoteButton value={1} currentlyVotes={voteNo} voting={voting} setVoting={setVoting} />
          <VoteButton value={2} currentlyVotes={voteYes} voting={voting} setVoting={setVoting} />
      </div>

      <div className="my-5">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-700/70 bg-red-200">
              No
              {` ${ totalVotes === 0 ? 0 : (voteNo/totalVotes*100).toFixed(2) }%`}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lime-600 bg-lime-200">
              Yes
              {` ${ totalVotes === 0 ? 0 : (voteYes/totalVotes*100).toFixed(2) }%`}
            </span>
            <span className="text-xs font-semibold inline-block text-lime-600">
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2.5 text-xs flex rounded my-2 bg-gray-800 dark:bg-gray-600">
          <div style={{"width":`${voteNo/totalVotes*100}%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
          <div style={{"width":`${voteYes/totalVotes*100}%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-lime-500"></div>
        </div>
      </div>
    </div>
  )
}
