import Web3 from 'web3';

export class web3Interface {
  constructor(address, abi, provider) {
    this.web3 = new Web3(provider);
    this.Contract = new this.web3.eth.Contract(abi, address);
  }

  async proposalId() {
    const proposalId = await this.Contract.methods.proposalId().call();
    return Number(proposalId);
  }

  async votesForYes() {
    const votesForYes = await this.Contract.methods.votesForYes().call();
    return Number(votesForYes);
  }

  async votesForNo() {
    const votesForNo = await this.Contract.methods.votesForNo().call();
    return Number(votesForNo);
  }

  async VOTE_FEE() {
    const VOTE_FEE = await this.Contract.methods.VOTE_FEE().call();
    return Web3.utils.fromWei(VOTE_FEE);
  }

  async getVote() {
    const accounts = await this.web3.eth.getAccounts();
    const vote = await this.Contract.methods.getVote(accounts[0]).call();
    return Number(vote) || undefined;
  }

  async vote(vote, toast, setIsVoting, setAlreadyVote) {
    const fee = await this.VOTE_FEE();
    const accounts = await this.web3.eth.getAccounts();
    const receipt = await this.Contract.methods
      .vote(vote)
      .send({
        from: accounts[0],
        value: Web3.utils.toWei(fee),
      })
      .on('transactionHash', (txHash) => {
        toast({
          title: 'Transacción enviada desde web3 js',
          description: txHash,
          status: 'info',
        });
      })
      .on('receipt', () => {
        toast({
          title: 'Transacción confirmada',
          description: 'Nunca pares de aprender',
          status: 'success',
        });
        setIsVoting(false);
        setAlreadyVote(true);
      })
      .on('error', (error) => {
        toast({
          title: 'Transacción fallida',
          description: error.message,
          status: 'error',
        });
        setIsVoting(false);
        setAlreadyVote(true);
      });

    return receipt.transactionHash;
  }
}
