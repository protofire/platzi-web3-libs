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
      setVoteNo(votes.voteForNo)
      setVoteYes(votes.voteForYes)
    }
  }, [selectedLibrary])

  useEffect(() => {
    getVotes()
  },[getVotes])

  return (
    <div>
      <p>
        Votos NO: {voteNo}
      </p>
      <p>
        Votos YES: {voteYes}
      </p>
    </div>
  )
}
