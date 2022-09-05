import {
	Center,
	Heading,
	SimpleGrid,
	Text,
	Button,
	VStack,
	Spinner,
	Badge,
	Box,
	useToast,
} from '@chakra-ui/react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { LibContext } from '../../App';
import useLibsAvailables from '../../hooks/useLibsAvailables';
import useProposal from '../../hooks/useProposal';

const Home = () => {
	const { lib } = useContext(LibContext);
	const { active, library, chainId } = useWeb3React();
	const libsAvailables = useLibsAvailables();
	const proposalContract = useProposal(lib, active, library, chainId);
	const [proposalId, setProposalId] = useState();
	const [votesForNo, setVotesForNo] = useState();
	const [votesForYes, setVotesForYes] = useState();
	const [fee, setFee] = useState();
	const toast = useToast();

	const getProposalData = useCallback(async () => {
		console.log('Getting data');
		console.log('> Contract', proposalContract, '> Active', active);
		if (active && proposalContract) {
			const idToSet = await proposalContract.proposalId();
			const yesToSet = await proposalContract.votesForYes();
			const noToSet = await proposalContract.votesForNo();
			const feeToSet = await proposalContract.VOTE_FEE();
			setFee(feeToSet);
			setProposalId(idToSet);
			setVotesForYes(yesToSet);
			setVotesForNo(noToSet);
			console.log('> data:', idToSet, yesToSet, noToSet);
		} else {
			setProposalId();
			setVotesForYes();
			setVotesForNo();
		}
	}, [active, proposalContract]);

	useEffect(() => getProposalData, [getProposalData]);

	useEffect(() => {
		console.log('Instanciando libreria = ', lib);
	}, [lib]);

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
		if (proposalContract) {
			try {
				let res = proposalContract.vote(event).then((res) => {
					getProposalData();
					return res;
				});
				console.log('>res', res);
			} catch (error) {
				console.log('>err', error);
			}
		}
	};

	return (
		<>
			<Center height={'70vh'}>
				<Box
					borderWidth="2px"
					borderRadius="xl"
					p={[10, 10]}
					borderColor="orange"
				>
					<VStack spacing="24px">
						<Heading
							color="orange"
							as={'span'}
							position={'relative'}
						>
							Proposal # {proposalId ? proposalId : <Spinner />}
						</Heading>
						<Text fontSize="xl" color="white">Vote for yes or for no for this proposal</Text>
						<Text fontSize="m" color="white">
							Using library:{' '}
							{lib
								? libsAvailables[lib].name + '.js'
								: 'Please choose a library'}
						</Text>
						<Text fontSize="m" color="white">
								Fee: {fee ? fee : <Spinner />} eth
						</Text>
						<SimpleGrid columns={2} spacing={10}>
							<Button
								variant={'outline'}
								colorScheme={'green'}
								size={'sm'}
								leftIcon={
									<Badge colorScheme="green" ml={1}>
										{votesForNo != null ? votesForYes : <Spinner />}
									</Badge>
								}
								onClick={voteYes}
							>
								Vote Yes
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
								onClick={voteNo}
							>
								Vote No
							</Button>
						</SimpleGrid>
					</VStack>
				</Box>
			</Center>
		</>
	);
};

export default Home;
