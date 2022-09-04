import { VoteButton } from "../VoteButton"
import { MdCheck, MdClose, MdWarning } from 'react-icons/md'

export const VoteSection = ({voting, setVoting, setAlreadyVoted, setAlertMessage, alertMessage} : any) => {

  return (
    <div>
      <div className="mb-8">
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 flex-inline no-wrap">
          Click into the 
            <span> <MdClose className="inline text-red-400" /> </span>
          or 
            <span> <MdCheck className="inline text-lime-400"/> </span>
          to vote
        </p>
      </div>
      <div className={`${alertMessage !== '' ? '' : 'hidden'} flex p-4  mb-4 bg-yellow-100 border-t-4 border-yellow-500 dark:bg-yellow-200`}>
        <MdWarning className="flex-shrink-0 w-5 h-5 text-yellow-700" />
        <div className="ml-3 text-sm font-medium text-yellow-700">
          {alertMessage}
        </div>
        <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-yellow-100 dark:bg-yellow-200 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 dark:hover:bg-yellow-300 inline-flex h-8 w-8" onClick={() => setAlertMessage('')}>
        <MdClose className="w-5 h-5" />
        </button>
      </div>
      <div className="flex no-wrap items-center">
        <VoteButton value={1} voting={voting} setVoting={setVoting} setAlreadyVoted={setAlreadyVoted} setAlertMessage={setAlertMessage} />
        <VoteButton value={2} voting={voting} setVoting={setVoting} setAlreadyVoted={setAlreadyVoted} setAlertMessage={setAlertMessage} />
      </div>
    </div>
  )
}
