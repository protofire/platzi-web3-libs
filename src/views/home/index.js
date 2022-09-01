import {
	Center,
	Heading,
	SimpleGrid,
	Text,
	Button,
	VStack,
    Spinner,
} from '@chakra-ui/react';
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { Web3Proposal } from '../../utils/web3';
import { useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

const Home = () => {
    const { active, library, chainId } = useWeb3React();
    console.log(library, chainId, active) 
    let choosedLib = localStorage.getItem('choosedLib')
            console.log(choosedLib);

    const [proposalId, setProposalId] = useState();
    const [votesForNo, setVotesForNo] = useState();
    const [votesForYes, setVotesForYes] = useState();

    const getData = useCallback(async () => {
        if (active) {
            console.log(library)
            const proposalContract = new Web3Proposal(chainId, library['web3']);
            const idToSet = await proposalContract.proposalId()
            const yesToSet = await proposalContract.votesForYes()
            const noToSet = await proposalContract.votesForNo()
            console.log("> Data", idToSet, yesToSet, noToSet)
            setProposalId(idToSet)
            setVotesForYes(yesToSet)
            setVotesForNo(noToSet)
        } else {
            setProposalId('')
        }
        console.log(active)
    }, [chainId, active, library])

    useEffect(() => getData, [getData])
    

	return (
		<>
			<Center>
				<VStack spacing="24px">
					<Heading color="orange">Proposal # {proposalId ? proposalId : <Spinner /> }</Heading>
					<Text fontSize="xl">
						Vote for yes or for no for this proposal
					</Text>
					<SimpleGrid columns={2} spacing={10}>
						<Button
							variant={'solid'}
							colorScheme={'green'}
							size={'sm'}
							leftIcon={<TriangleUpIcon />}
						>
							Yes | {votesForYes ? votesForYes : <Spinner />}
						</Button>
						<Button
							variant={'solid'}
							colorScheme={'red'}
							size={'sm'}
							leftIcon={<TriangleDownIcon />}
						>
							No | {votesForNo!=null ? votesForNo : <Spinner />}
						</Button>
					</SimpleGrid>
				</VStack>
			</Center>
		</>
	);
};

export default Home;
