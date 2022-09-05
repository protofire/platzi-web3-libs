import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';

export class EthersInterface {
  constructor(address, abi, provider) {
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    this.Contract = new ethers.Contract(
      address,
      abi,
      ethersProvider.getSigner()
    );
    this.signer = ethersProvider.getSigner();
  }
  async proposalId() {
    const proposalId = await this.Contract.proposalId();
    return proposalId;
  }

  async votesForYes() {
    const votesForYes = await this.Contract.votesForYes();
    return votesForYes;
  }

  async votesForNo() {
    const votesForNo = await this.Contract.votesForNo();
    return votesForNo;
  }

  async VOTE_FEE() {
    const VOTE_FEE = await this.Contract.VOTE_FEE();
    return ethers.utils.formatEther(VOTE_FEE);
  }

  async getVote() {
    const address = await this.Contract.signer.getAddress();
    const vote = await this.Contract.getVote(address);
    return Number(vote) || undefined;
  }

  async vote(vote, toast, setIsVoting, setAlreadyVote) {
    const fee = await this.VOTE_FEE();
    const tx = await this.Contract.vote(vote, {
      value: ethers.utils.parseEther(fee),
    });
    setIsVoting(false);
    setAlreadyVote(true);
    toast({
      title: 'Transacción enviada desde ether js',
      description: 'La transacción se confirmará en unos segundos',
      status: 'success',
    });
    return tx.hash;
  }
}
