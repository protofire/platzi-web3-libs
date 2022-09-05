import { useMemo, useContext } from 'react';
import { useWeb3React } from '@web3-react/core';
import { LibContext } from '../../App';
import useLibsAvailables from '../useLibsAvailables';

const useProposal = (lib, active, library, chainId) => {
	// const { lib } = useContext(LibContext);
	// const { active, library, chainId } = useWeb3React();
	const libsAvailables = useLibsAvailables();

	const proposal = useMemo(() => {
        console.log("> Instancing proposal contract")
		if (chainId && lib) {
            let libToUse = libsAvailables[lib].name;
			return new libsAvailables[lib].instance(chainId, library[libToUse]);
		}
	}, [active, chainId, libsAvailables, lib, library]);
	return proposal;
};

export default useProposal;
