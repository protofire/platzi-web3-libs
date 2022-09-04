import { MdCheck, MdClose } from 'react-icons/md'
import { useContext, useState, useCallback, useEffect } from 'react'
import {LibraryContext} from '../../App'
import { VoteResponse } from "../../hooks/domain/Provider"


export const VoteButton = (
  { value, voting, setVoting, currentlyVotes, setAlreadyVoted } : { value: Number, currentlyVotes: Number, voting: any, setVoting: any, setAlreadyVoted: any }
) => {
  const { active, account, selectedLibrary } =  useContext(LibraryContext)


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
      //alreadyVoted === 0 &&  TODO temporal disabled
      !voting && active && account && selectedLibrary
    ) {
      setVoting(true)
      try {
        await selectedLibrary.sendVote(account, value)
      } catch (error) {
      }
      setVoting(false)
    }
  }

  return (
    <>
      <div
        onClick={() => {voteNow()}}
        className={
          `flex items-center justify-center p-4 mb-2 full max-w-xs text-gray-500 border-2 border-white rounded-lg shadow dark:text-gray-500 dark:border-gray-700/90 mx-10 group`
      }> 
        <div
          className={
            `shadow-md shadow-gray-800/80 dark:shadow-gray-400/50 inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg xl:group-hover:scale-110
              ${
                value === 1 ?
                  "text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200"
                  :
                  "text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200"
              }
          `}>

            <div className="absolute h-2.5 w-2.5">
              <span className="absolute inline-flex top-4 left-4 rounded-full h-2.5 w-2.5 bg-sky-300"></span>
              <span className="animate-ping absolute top-4 left-4 inline-flex h-full w-full rounded-full bg-sky-300 opacity-75"></span>
            </div>
        {
          value === 1 ? 
              <MdClose />
          :
              <MdCheck />
        }
        </div>
        <div className="ml-3 text-sm font-normal">Vote for {value === 1 ? 'No' : 'Yes' } </div>
      </div>
    </>
  )
}
