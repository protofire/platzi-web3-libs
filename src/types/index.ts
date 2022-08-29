export interface Proposal {
  proposalId: () => Promise<number>
  votesForYes: () => Promise<number>
  votesForNo: () => Promise<number>
  VOTE_FEE: () => Promise<string>
}
