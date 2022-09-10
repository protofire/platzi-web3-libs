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
	Box,
	Spinner,
	SimpleGrid,
	Heading,
	Badge,
	useToast,
	Link,
} from '@chakra-ui/react';
import { CheckCircleIcon, InfoIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { connector } from '../../config/web3';
import truncated from '../../utils/truncated';
import CustomRadio from '../../components/CustomRadio';
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

const utilLibs = {
	ethers: { Proposal: EthersProposal },
	web3: { Proposal: Web3Proposal },
};

const Home = () => {
	const { active, activate, deactivate, account, error, library, chainId } =
		useWeb3React();
	const [isLib, setIsLib] = useState();
	const [isVote, setIsVote] = useState(false);
	const [proposalId, setProposalId] = useState();
	const [votesForNo, setVotesForNo] = useState();
	const [votesForYes, setVotesForYes] = useState();
	const [isData, setIsData] = useState();
	const toast = useToast();

	const isUnsupportedChain = error instanceof UnsupportedChainIdError;

	const handleConnect = () => {
		activate(connector);
	};

	const handleDisconnect = () => {
		deactivate();
		setIsLib();
		setIsVote(false);
		setProposalId();
		setVotesForNo();
		setVotesForYes();
	};

	const handleChange = (value) => {
		setIsLib(value);
		getData();
	};

	const { value, getRadioProps, getRootProps } = useRadioGroup({
		defaultValue: 'Kevin',
		onChange: handleChange,
	});

	const getData = async () => {
		if (active && isLib) {
			console.log(library, utilLibs[isLib]);
			setIsData(false);
			const proposalContract = new utilLibs[isLib].Proposal(
				chainId,
				library[isLib]
			);
			// const proposalContract = new Web3Proposal(chainId, library[isLib]);
			const idToSet = await proposalContract.proposalId();
			const yesToSet = await proposalContract.votesForYes();
			const noToSet = await proposalContract.votesForNo();
			console.log('> Data', idToSet, yesToSet, noToSet);
			setProposalId(idToSet);
			setVotesForYes(yesToSet);
			setVotesForNo(noToSet);
			setIsData(true);
		} else {
			setProposalId('');
		}
		console.log('> active:', active);
	};

	const voteYes = async (event) => {
		event.preventDefault();
		await vote(2);
	};

	const voteNo = async (event) => {
		event.preventDefault();
		await vote(1);
	};

	const vote = async (event) => {
		console.log(event);
		if (active && isLib) {
			try {
				const proposalContract = new utilLibs[isLib].Proposal(
					chainId,
					library[isLib]
				);
				let res = await proposalContract.vote(event);
				console.log(res);
				if (res && res.status) {
					toast({
						title: 'Transacción exitosa',
						status: 'success',
						description: res.message,
						isClosable: true,
					});
					getData();
					setIsVote(true);
				} else {
					toast({
						title: 'Something get wrong',
						status: 'warning',
						description: res.message | '',
						isClosable: true,
					});
				}
			} catch (error) {
				toast({
					title: 'Error',
					status: 'error',
					description: error.message,
					isClosable: true,
				});
				console.log('>err', error);
			}
		}
	};

	return (
		<>
			<Center height={'100vh'}>
				<SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} spacing={10}>
					<Box pl={8}>
						<Heading>Reto: Platzi Web3 Libs</Heading>
						<Stack mt={5} mb={5} direction="row">
							<Link
								href="https://platzi.com/cursos/ethereum-dev-program/"
								isExternal
							>
								<Badge colorScheme="green">Platzi</Badge>
							</Link>
							<Link href="https://protofire.io/" isExternal>
								<Badge colorScheme="orange">Protofire</Badge>
							</Link>
						</Stack>
						<Text>
							En esta DApp puedes votar (si o no) a una propuesta. Solo puedes
							votar una vez por address y cuesta 0.01 ETH.
						</Text>

						<Text>
							Puedes elegir si se usa ethers.js o web3.js para comunicarse con
							los smart contracts
						</Text>
						<Stack mt={5} mb={5} direction="column">
							<Text>
								<Link href="https://goerli.etherscan.io/" isExternal>
									<Badge colorScheme="blue">Red:</Badge>
									{'  '}Goerli
								</Link>
							</Text>
							<Text>
								<Link
									href="https://goerli.etherscan.io/address/0xacfc7725527ba2ee4311574f65e5d76f9f9585e9#code"
									isExternal
								>
									<Badge colorScheme="blue">Contrato:</Badge>
									{'  '}0xacfc7725527ba2ee4311574f65e5d76f9f9585e9
								</Link>
							</Text>
							<Text>
								<Link href="https://github.com/andiazo" isExternal>
									<Badge colorScheme="blue">Autor:</Badge>
									{'  '}
									Andres Diaz
								</Link>
							</Text>
						</Stack>
					</Box>
					<Box>
						<List spacing={10}>
							{active ? (
								<>
									<ListItem>
										<ListIcon as={CheckCircleIcon} color="green.500" />
										Wallet conectada!
										<Center>
											<Button
												color="green.500"
												ml={3}
												onClick={handleDisconnect}
											>
												{truncated(account)}
											</Button>
										</Center>
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
													{proposalId != null ? (
														<>
															{isData ? (
																<Center mt={3}>
																	<Box>
																		<Text>Proposal # {proposalId}</Text>
																		<Button mt={3} onClick={voteYes}>
																			Yes: {votesForYes}
																		</Button>
																		<Button mt={3} ml={3} onClick={voteNo}>
																			No: {votesForNo}
																		</Button>
																	</Box>
																</Center>
															) : (
																<Center>
																	<Spinner color="gray.500" />
																</Center>
															)}
														</>
													) : (
														<></>
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
										<Center>
											<Button
												ml={3}
												onClick={handleConnect}
												disabled={isUnsupportedChain}
											>
												{isUnsupportedChain ? 'Red no soportada' : 'Conectar'}
											</Button>
										</Center>
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
					</Box>
				</SimpleGrid>
			</Center>
		</>
	);
};

export default Home;
