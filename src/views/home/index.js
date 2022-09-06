import {
	Center,
	List,
	ListItem,
	ListIcon,
	Button,
	Stack,
	useRadioGroup,
	HStack,
	Text,
} from '@chakra-ui/react';
import { CheckCircleIcon, InfoIcon } from '@chakra-ui/icons';
import { useCallback, useEffect, useState } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { connector } from '../../config/web3';
import truncated from '../../utils/truncated';
import CustomRadio from '../../components/CustomRadio';
import Proposal from '../../components/Proposal';
import { Web3Proposal } from '../../utils/web3';
import { EthersProposal } from '../../utils/ethers';

const libraries = [
	{
		name: 'ethers',
		image: 'https://ethers.org/static/logo.png',
		class: Web3Proposal,
	},
	{
		name: 'web3',
		image: 'https://web3js.org/web3js.png',
		class: EthersProposal,
	},
];

const Home = () => {
	const { active, activate, deactivate, account, error, library, chainId } =
		useWeb3React();
	const [isLib, setIsLib] = useState();
	const [isVote, setIsVote] = useState(false);
	const [proposalId, setProposalId] = useState();
	const [votesForNo, setVotesForNo] = useState();
	const [votesForYes, setVotesForYes] = useState();

	const isUnsupportedChain = error instanceof UnsupportedChainIdError;

	const handleConnect = () => {
		activate(connector);
	};

	const handleDisconnect = () => {
		deactivate();
		setIsLib();
	};

	const handleChange = (value) => {
		setIsLib(value);
	};

	const { value, getRadioProps, getRootProps } = useRadioGroup({
		defaultValue: 'Kevin',
		onChange: handleChange,
	});

	const getData = async () => {
		if (active && isLib) {
			console.log(library);
			const proposalContract = new Web3Proposal(chainId, library[isLib]);
			const idToSet = await proposalContract.proposalId();
			const yesToSet = await proposalContract.votesForYes();
			const noToSet = await proposalContract.votesForNo();
			console.log('> Data', idToSet, yesToSet, noToSet);
			setProposalId(idToSet);
			setVotesForYes(yesToSet);
			setVotesForNo(noToSet);
		} else {
			setProposalId('');
		}
		console.log('> active:', active);
	};

	return (
		<>
			<Center height={'100vh'}>
				<List spacing={10}>
					{active ? (
						<>
							<ListItem>
								<ListIcon as={CheckCircleIcon} color="green.500" />
								Wallet conectada!
								<Button color="green.500" ml={3} onClick={handleDisconnect}>
									{truncated(account)}
								</Button>
							</ListItem>
							{isLib ? (
								<>
									<ListItem>
										<ListIcon as={CheckCircleIcon} color="green.500" />
										La librería seleccionada es: {value}.js
										<Center>
											<Stack {...getRootProps()}>
												<HStack>
													{libraries.map((libr) => {
														return (
															<CustomRadio
																key={libr.name}
																image={libr.image}
																{...getRadioProps({ value: libr.name })}
															/>
														);
													})}
												</HStack>
											</Stack>
										</Center>
									</ListItem>
									{isVote ? (
										<ListItem>
											<ListIcon as={CheckCircleIcon} color="green.500" />
											Vota por la propuesta
										</ListItem>
									) : (
										<ListItem>
											<ListIcon as={InfoIcon} color="gray.500" />
											Vota si o no a la propuesta
											<Button ml={3} onClick={getData}>
												Votar
											</Button>
											{proposalId != null ? (
												<>
													<Text>Proposal # {proposalId}</Text>
													<Button>Yes: {votesForYes}</Button>
													<Button>No: {votesForNo}</Button>
												</>
											) : (

												<>
												</>
											)}
										</ListItem>
									)}
								</>
							) : (
								<>
									<ListItem>
										<ListIcon as={InfoIcon} color="gray.500" />
										Elije una libreria
										<Center>
											<Stack {...getRootProps()}>
												<HStack>
													{libraries.map((libr) => {
														return (
															<CustomRadio
																key={libr.name}
																image={libr.image}
																{...getRadioProps({ value: libr.name })}
															/>
														);
													})}
												</HStack>
											</Stack>
										</Center>
									</ListItem>
									<ListItem>
										<ListIcon as={InfoIcon} color="gray.500" />
										Para votar, elije una libreria
									</ListItem>
								</>
							)}
						</>
					) : (
						<>
							<ListItem>
								<ListIcon as={InfoIcon} color="gray.500" />
								Conecta tu wallet
								<Button
									ml={3}
									onClick={handleConnect}
									disabled={isUnsupportedChain}
								>
									{isUnsupportedChain ? 'Red no soportada' : 'Conectar'}
								</Button>
							</ListItem>
							<ListItem>
								<ListIcon as={InfoIcon} color="gray.500" />
								Elije tu librería
							</ListItem>
							<ListItem>
								<ListIcon as={InfoIcon} color="gray.500" />
								Para votar, conecta tu wallet
							</ListItem>
						</>
					)}
				</List>
			</Center>
		</>
	);
};

export default Home;
