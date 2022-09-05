import { useMemo } from "react";
import { EthersProposal } from '../../utils/ethers';
import { Web3Proposal } from '../../utils/web3';

const useLibsAvailables = () => {
	return useMemo(() => {
		return {
			opt_web3: { name: 'web3', instance: Web3Proposal },
			opt_ethers: { name: 'ethers', instance: EthersProposal },
		};
	}, []);
};

export default useLibsAvailables