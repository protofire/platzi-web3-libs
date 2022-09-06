import {
	Center,
	List,
	ListItem,
	ListIcon,
	Heading,
	Button,
	Switch,
	Select,
	RadioGroup,
	Radio,
	Stack,
	useRadioGroup,
	useRadio,
	Box,
	Image,
	useToast,
	Text,
	HStack,
} from '@chakra-ui/react';
import { CheckCircleIcon, InfoIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { connector } from '../../config/web3';
import truncated from '../../utils/truncated';
import CustomRadio from '../../components/CustomRadio';
import Proposal from '../../components/Proposal';

const libraries = [
	{ name: 'ethers', image: 'https://ethers.org/static/logo.png' },
	{ name: 'web3', image: 'https://web3js.org/web3js.png' },
];

const Home = () => {

	const handleChange = (value) => {
		setIsLib(value)
	};

	const { value, getRadioProps, getRootProps } = useRadioGroup({
		defaultValue: 'Kevin',
		onChange: handleChange,
	});

	const { active, activate, deactivate, account, error, library } =
		useWeb3React();
	const [isLib, setIsLib] = useState();
	const [isVote, setIsVote] = useState(false);

	const isUnsupportedChain = error instanceof UnsupportedChainIdError;

	const handleConnect = () => {
		activate(connector);
	};

	const handleDisconnect = () => {
		deactivate();
		setIsLib();
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
											<Proposal props={1}/>
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
