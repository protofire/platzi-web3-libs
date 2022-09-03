import { useState, useCallback, useEffect, useContext } from 'react'
import { LibraryContext } from "../../App"


export const Home = () => {
  const [voteNo, setVoteNo] = useState(0)
  const [voteYes, setVoteYes] = useState(0)
  const {selectedLibrary} = useContext(LibraryContext)

  const getVotes = useCallback(async () => {
    if(selectedLibrary?.contract) {
      const votes = await selectedLibrary.getVotes()
      console.log('Votos response', votes)
      setVoteNo(votes.votesForNo)
      setVoteYes(votes.votesForYes)
    }

  }, [selectedLibrary])

  useEffect(() => {
    getVotes()
  },[getVotes])

  return (
    <div>
      <p>
        Votos NO: {voteNo > 0 ? voteNo : '-'}
      </p>
      <p>
        Votos YES: {voteYes > 0 ? voteYes : '-'}
      </p>
    </div>
  )
}
