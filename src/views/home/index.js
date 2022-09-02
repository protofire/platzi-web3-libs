import {
	Center,
	Heading,
	SimpleGrid,
	Text,
	Button,
	VStack,
	Spinner,
	Badge,
	Box
} from '@chakra-ui/react';
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { Web3Proposal } from '../../utils/web3';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { LibContext } from '../../App';

const Home = () => {
	const { lib, setLib } = useContext(LibContext);
	const { active, library, chainId } = useWeb3React();

	console.log(library, chainId, active);
	let choosedLib = localStorage.getItem('choosedLib');
	console.log(choosedLib);

	const [proposalId, setProposalId] = useState();
	const [votesForNo, setVotesForNo] = useState();
	const [votesForYes, setVotesForYes] = useState();

	const getData = useCallback(async () => {
		if (active) {
			console.log(library);
			const proposalContract = new Web3Proposal(chainId, library['web3']);
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
		console.log(active);
	}, [chainId, active, library]);

	useEffect(() => getData, [getData]);

	const libsAvailables = {
		opt_web3: { name: 'web3.js' },
		opt_ethers: { name: 'ethers.js' },
	};

	return (
		<>
			<Center height={'70vh'}>
				<Box borderWidth='2px' borderRadius='xl' p={[10,10]}>
					<VStack spacing="24px">
						<Heading color="orange">
							Proposal # {proposalId ? proposalId : <Spinner />}
						</Heading>
						<Text fontSize="xl">Vote for yes or for no for this proposal</Text>
						<Text fontSize="m">
							Using library:{' '}
							{lib ? libsAvailables[lib].name : 'Please choose a library'}
						</Text>
						<SimpleGrid columns={2} spacing={10}>
							<Button
								variant={'outline'}
								colorScheme={'green'}
								size={'sm'}
								leftIcon={
									<Badge colorScheme="green" ml={1}>
										{votesForYes ? votesForYes : <Spinner />}
									</Badge>
								}
							>
								Yes
							</Button>
							<Button
								variant={'outline'}
								colorScheme={'red'}
								size={'sm'}
								leftIcon={
									<Badge colorScheme="red" ml={1}>
										{votesForNo != null ? votesForNo : <Spinner />}
									</Badge>
								}
							>
								No
							</Button>
						</SimpleGrid>
					</VStack>
				</Box>
			</Center>
		</>
	);
};

export default Home;
