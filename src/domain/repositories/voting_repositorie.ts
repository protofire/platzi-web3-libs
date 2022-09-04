export interface VotingRepository {
  makeVote(vote: string): Promise<String>;
  connectWallet(): Promise<void>;
  getAddress(): Promise<string>;
  getVote(address: string): Promise<string>;
  getNegativeVotes(): Promise<string>;
  getPositiveVotes(): Promise<string>;
}
