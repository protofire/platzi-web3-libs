import { Center, List, ListItem, ListIcon, Heading, Button, Switch } from '@chakra-ui/react';
import { CheckCircleIcon, InfoIcon } from '@chakra-ui/icons';
import { useState } from 'react';
// import { useCallback, useContext, useEffect, useState } from 'react';
// import { useWeb3React } from '@web3-react/core';
// import { LibContext } from '../../App';
// import useLibsAvailables from '../../hooks/useLibsAvailables';
// import useProposal from '../../hooks/useProposal';
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { connector } from '../../config/web3';
import truncated from '../../utils/truncated';


const Home = () => {
	const { active, activate, deactivate, account, error, library } =
      useWeb3React();
	const [isConnected, setIsConnected] = useState(false);
	const [isLib, setIsLib] = useState(false);

	const isUnsupportedChain = error instanceof UnsupportedChainIdError;

	const handleConnect = () => {
		activate(connector);
	}

	const handleDisconnect = () => {
		deactivate();
	}

	return (
		<>
			<Center height={'70vh'}>
				<List spacing={3}>
					{active ? (
						<ListItem>
							<ListIcon as={CheckCircleIcon} color="green.500" />
							Wallet conectada!
							<Button ml={3} onClick={handleDisconnect}>{truncated(account)}</Button>
						</ListItem>
					) : (
						<ListItem>
							<ListIcon as={InfoIcon} color="gray.500" />
							Conecta tu wallet
							<Button ml={3} onClick={handleConnect} disabled={isUnsupportedChain}>{isUnsupportedChain ? "Red no soportada" : "Conectar"}</Button>
						</ListItem>
					)}
					{active ? (
						<ListItem>
							<ListIcon as={CheckCircleIcon} color="green.500" />
							Elije tu librería
							<Switch ml={3} size='md'/>
						</ListItem>
					) : (
						<ListItem>
							<ListIcon as={InfoIcon} color="gray.500" />
							Elije tu librería
							
						</ListItem>
					)}

					{isLib ? (
						<ListItem>
							<ListIcon as={CheckCircleIcon} color="green.500" />
							Vota por la propuesta
						</ListItem>
					) : (
						<ListItem>
							<ListIcon as={InfoIcon} color="gray.500" />
							Para votar, conecta tu wallet y elije la librerías
						</ListItem>
					)}
				</List>
			</Center>
		</>
	);
};

export default Home;
