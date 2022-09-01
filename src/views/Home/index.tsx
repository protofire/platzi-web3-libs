import { FC, useState, useCallback, useEffect } from 'react'
import { useProposalContract } from '../../hooks/useProposalContract'


export const Home: FC = () => {
  const [voteNo, setVoteNo] = useState(0)
  const [voteYes, setVoteYes] = useState(0)
  const proposalContract = useProposalContract()

  const getVotes = useCallback(async () => {
    if(proposalContract) {
      const votesForNo = await proposalContract.methods.votesForNo().call()
      setVoteNo(votesForNo)
      const votesForYes = await proposalContract.methods.votesForYes().call() // read
      setVoteYes(votesForYes)
    }

  }, [proposalContract])

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
