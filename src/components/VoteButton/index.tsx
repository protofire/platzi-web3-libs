import { MdCheck, MdClose } from 'react-icons/md'
import { useContext, useState, useCallback, useEffect } from 'react'
import {LibraryContext} from '../../App'
import { VoteResponse } from "../../hooks/domain/Provider"


export const VoteButton = (
  { value, voting, setVoting, currentlyVotes } : { value: Number, currentlyVotes: Number, voting: any, setVoting: any }
) => {
  const { active, account, selectedLibrary } =  useContext(LibraryContext)

  const [ alreadyVoted, setAlreadyVoted ] = useState(-1)

  const votedStyles = () => {
    if (value === alreadyVoted && (alreadyVoted === 1  || alreadyVoted === 2)) {
      return "border-2 border-white"
    }
    return ""
  }

  const alreadyVotedCallback = useCallback(async () => {
    if(selectedLibrary?.contract) {
      try {
        const voted = await selectedLibrary.getVoteAccount(account)
        setAlreadyVoted(Number(voted))
      } catch {
        setAlreadyVoted(0)
      }
    }
  }, [ account, selectedLibrary ])

  useEffect(() => {
    alreadyVotedCallback()
  },[alreadyVotedCallback])

  const voteNow = async () => {
    if (
      //alreadyVoted === 0 &&  temporal disabled
      !voting && active && account && selectedLibrary
    ) {
      setVoting(true)
      try {
        const result : VoteResponse = await selectedLibrary.sendVote(account, value)
        console.log(result)
      } catch (error) {
        console.log(error)
      }
      setVoting(false)
    }
  }

  return (
    <>
      <div
        onClick={() => {voteNow()}}
        className={
          `flex items-center justify-center p-4 mb-2 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 ${votedStyles()}`
      }>
        <div
          className={
            `inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg shadow-md shadow-blue-700/80 ring-1 ring-blue-500 xl:hover:scale-125 
              ${
                value === 1 ?
                  "text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200"
                  :
                  "text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200"
              }
          `}>
        {
          value === 1 ? 
              <MdClose />
          :
              <MdCheck />
        }
        </div>
        <div className="ml-3 text-sm font-normal">Votes for {value === 1 ? 'No' : 'Yes' }: </div>
        <div className="ml-3 text-sm font-normal px-1 border-2 border-slate-200/10">{currentlyVotes.toString()}</div>
      </div>
    </>
  )
}
