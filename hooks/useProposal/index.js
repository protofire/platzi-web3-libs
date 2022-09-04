import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";

import { PROPOSAL_ADDRESS, ABI } from "../../constants";

import { useCustomWeb3React } from '../../hooks'

const useProposal = () => {
    const { active, library, chainId } = useCustomWeb3React()

    const proposal = useMemo(() => {
        if(active) return new library.ethers.contract(ABI, PROPOSAL_ADDRESS[chainId])
    }, [active, chainId, library?.ethers?.Contract])

    return proposal
}

export default useProposal