import { useState, useCallback, useEffect } from 'react'
import {VoteButton} from '../VoteButton'
import { MdCheck, MdClose } from 'react-icons/md'

export const Dashboard = ({selectedLibrary} : any) => {

  const [voteNo, setVoteNo] = useState(0)
  const [voteYes, setVoteYes] = useState(0)
  const [totalVotes, setTotalVotes] = useState(0)
  const [ alreadyVoted, setAlreadyVoted ] = useState(-1)
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
      <div className="flex justify-center flex-wrap">
        {voting ? 

          <>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 flex-inline no-wrap">
            Click into the 
              <span> <MdClose className="inline text-red-400" /> </span>
            or 
              <span> <MdCheck className="inline text-lime-400"/> </span>
            to vote
          </p>
          <div className="flex no-wrap items-center">
              <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="text-xs">Sending transaction...</span>
          </div>
          </>
          :
            alreadyVoted ?
              <p className="text-md">Thanks for voting</p>
          :
          <>
            <VoteButton value={1} currentlyVotes={voteNo} voting={voting} setVoting={setVoting} setAlreadyVoted={setAlreadyVoted} />
            <VoteButton value={2} currentlyVotes={voteYes} voting={voting} setVoting={setVoting} setAlreadyVoted={setAlreadyVoted} />
          </>
        }
       </div>


      <div className="my-5">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-700/70 bg-red-200">
              No ({voteNo})
              {` ${ totalVotes === 0 ? 0 : (voteNo/totalVotes*100).toFixed(2) }%`}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lime-600 bg-lime-200">
              Yes ({voteYes})
              {` ${ totalVotes === 0 ? 0 : (voteYes/totalVotes*100).toFixed(2) }%`}
            </span>
            <span className="text-xs font-semibold inline-block text-lime-600">
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2.5 text-xs flex rounded my-2 bg-gray-800 dark:bg-gray-600 animate-shadow-effect">
          <div style={{"width":`${voteNo/totalVotes*100}%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
          <div style={{"width":`${voteYes/totalVotes*100}%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-lime-500"></div>
        </div>
      </div>
    </div>
  )
}
