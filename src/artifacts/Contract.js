const ContractArtifact = {
  address: {
    5: "0xAcFC7725527bA2Ee4311574F65e5d76F9F9585E9", //goerli address
  },
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "proposalId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "vote",
          type: "uint256",
        },
      ],
      name: "VoteCasted",
      type: "event",
    },
    {
      inputs: [],
      name: "VOTE_FEE",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "clean",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_user", type: "address" }],
      name: "getVote",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "proposalId",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_vote", type: "uint256" }],
      name: "vote",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "votesForNo",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "votesForYes",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ],
  etherABI: [
    // Read-Only Functions
    "function proposalId() view returns (uint256)",
    "function votesForNo() view returns (uint256)",
    "function votesForYes() view returns (uint256)",
    "function VOTE_FEE() view returns (uint256)",
    "function getVote(address _user) external view returns (uint256)",

    // Authenticated Functions
    "function vote(uint256 _vote) external payable",

    // Events
    "event VoteCasted(uint256 indexed proposalId, address indexed from, uint256 vote)",
  ],
};

export default ContractArtifact;
