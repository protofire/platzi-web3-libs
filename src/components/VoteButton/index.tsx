import { MdCheck, MdClose } from 'react-icons/md'
import { useContext } from 'react'
import {LibraryContext} from '../../App'
import { VoteResponse } from "../../hooks/domain/Provider"

export const VoteButton = (
  { value, voting, setVoting } : { value: Number, voting: any, setVoting: any }
) => {
  const { active, account, selectedLibrary } =  useContext(LibraryContext)
  const voteNow = async () => {
    console.log('Status', voting)
    if (!voting && active && account && selectedLibrary) {
      setVoting(true)
      const result : VoteResponse = await selectedLibrary.sendVote(account, value)
      console.log(result)
      setVoting(false)
    }
  }

  return (
    <>
      <div
        onClick={() => {voteNow()}}
        className={
          `inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg 
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
    </>
  )
}
