import { Flex, Button, Badge } from '@chakra-ui/react';
import { AddIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { connector } from '../../../config/web3';
import useTruncatedAddress from '../../../hooks/useTruncatedAddress';
import { useCallback, useEffect } from 'react';

const WalletData = () => {
	const { active, activate, deactivate, account, error } = useWeb3React();

	const isUnsupportedChain = error instanceof UnsupportedChainIdError;
	const truncatedAddress = useTruncatedAddress(account);

	const connect = useCallback(() => {
		activate(connector);
		localStorage.setItem('previouslyConnected', 'true');
	}, [activate]);

	const disconnect = () => {
		deactivate();
		localStorage.removeItem('previouslyConnected');
	};

	useEffect(() => {
		if (localStorage.getItem('previouslyConnected') === 'true') connect();
	}, [connect]);

	return (
		<Flex alignItems={'center'}>
			{active ? (
				<Button
					variant={'solid'}
					colorScheme={'orange'}
					size={'sm'}
					rightIcon={<SmallCloseIcon />}
					onClick={disconnect}
					disabled={isUnsupportedChain}
				>
					<Link to={`/`}>{truncatedAddress}</Link>
				</Button>
			) : (
				<Button
					variant={'solid'}
					colorScheme={'orange'}
					size={'sm'}
					leftIcon={<AddIcon />}
					onClick={connect}
					disabled={isUnsupportedChain}
				>
					{isUnsupportedChain ? 'Red no soportada' : 'Conectar wallet'}
				</Button>
			)}
		</Flex>
	);
};

export default WalletData;
