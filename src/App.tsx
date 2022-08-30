import React /*, { useMemo }*/ from 'react'
import './App.css'
import Header from './components/Header'
// import { SupportedChainId } from './constants'
// import { useCustomWeb3React } from './hooks'
// import { Vote } from './types'
// import { EthersProposal } from './utils/ethers'
// import { Web3Proposal } from './utils/web3'

function App() {
  // const { chainId, library } = useCustomWeb3React()

  // useMemo(async () => {
  //   if (library && chainId) {
  // const ethersProposal = new EthersProposal(
  //   chainId as SupportedChainId,
  //   library.ethers
  // )

  //const hash = await ethersProposal.vote(Vote.Yes)
  //console.log(hash)

  // const vote = await ethersProposal.getVote()
  // const proposalId = await ethersProposal.proposalId()
  // const votesForNo = await ethersProposal.votesForNo()
  // const votesForYes = await ethersProposal.votesForYes()
  // console.log({ proposalId, votesForNo, votesForYes, vote })

  // ------------------------------------------------------------

  // const web3Proposal = new Web3Proposal(
  //   chainId as SupportedChainId,
  //   library.web3.currentProvider
  // )

  // const vote = await web3Proposal.getVote()
  // const proposalId = await web3Proposal.proposalId()
  // const votesForNo = await web3Proposal.votesForNo()
  // const votesForYes = await web3Proposal.votesForYes()
  // console.log({ proposalId, votesForNo, votesForYes, vote })

  // const hash = await web3Proposal.vote(Vote.Yes)
  // console.log(hash)
  //   }
  // }, [library, chainId])

  return (
    <div className="App">
      <Header />
    </div>
  )
}

export default App
