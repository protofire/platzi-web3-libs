import { useWeb3React } from '@web3-react/core';
import React, { useState, useCallback, useEffect, useContext } from 'react';
import { Link } from '@nextui-org/react';
import { useContract } from '../../hooks/useContract';
import Image from 'next/image';
import { Layout } from '../Layouts/homeLayout';
import {
  Stack,
  Flex,
  Heading,
  Text,
  Badge,
  useToast,
  HStack,
} from '@chakra-ui/react';
import VoteImage from '../../public/online-electronic-voting_74855-4448.webp';
import { VotingCard } from './VoteCard';
import { BiLike, BiDislike } from 'react-icons/bi';
import { AppContext } from '../context/appContext';

export const Main = () => {
  const { active, account, library, deactivate } = useWeb3React();
  const [votesYes, setVotesYes] = useState(0);
  const [votesNo, setVotesNo] = useState(0);
  const [alreadyVote, setAlreadyVote] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const [isVoting, setIsVoting] = useState(false);
  const contract = useContract();
  const toast = useToast();
  const context = useContext(AppContext);
  useEffect(() => {
    if (contract) {
      if (context.library == 'web3') {
        contract.Contract.events
          .VoteCasted()
          .on('data', (event) => {
            const vote = event.returnValues.vote;
            if (vote == 1) {
              setVotesNo(votesNo + 1);
            } else {
              setVotesYes(votesYes + 1);
            }
            setTotalVotes(totalVotes + 1);
            console.log(event);
            toast({
              title: 'Someone just vote',
              description: event.returnValues.vote == 1 ? 'No' : 'Yes',
              status: 'info',
            });
          })
          .on('error', console.error);
      } else {
        contract.Contract.on('VoteCasted', (event) => {
          console.log(event);
          const vote = Number(event);
          console.log(vote);
          if (vote == 1) {
            setVotesNo(votesNo + 1);
          } else if (vote == 2) {
            setVotesYes(votesYes + 1);
          }

          setTotalVotes(totalVotes + 1);
          console.log(event);
          toast({
            title: 'Someone just vote',
            description: vote == 1 ? 'No' : 'Yes',
            status: 'info',
          });
        }).on('error', console.error);
      }
    }
  }, [contract]);

  const getVotingData = useCallback(async () => {
    if (contract) {
      const yesVotes = await contract.votesForYes();
      const noVotes = await contract.votesForNo();
      const vote = await contract.getVote();
      setVotesNo(parseInt(noVotes));
      setVotesYes(parseInt(yesVotes));
      setTotalVotes(parseInt(noVotes) + parseInt(yesVotes));
      setAlreadyVote(vote ? true : false);
    }
  }, [contract, account]);

  useEffect(() => {
    getVotingData();
  }, [getVotingData]);

  const vote = (value) => {
    setIsVoting(true);
    contract.vote(value, toast, setIsVoting, setAlreadyVote);
  };

  return (
    <Layout>
      <Stack
        align="center"
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column-reverse', md: 'row' }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
          >
            <Text as={'span'} position={'relative'}>
              Voting App
            </Text>
            <Image alt="voting image" src={VoteImage} />
            <br />
          </Heading>
          <Text color={'gray.500'}>
            Votaciones transparentes y decentralizadas
          </Text>
          <Text color={'green.500'}>
            Cada voto es transparente e inmutable, solo puedes votar una vez por
            dirección asi que elige bien :)
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: 'column', sm: 'row' }}
          >
            <Link
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
              colorScheme={'green'}
              bg={'green.400'}
              _hover={{ bg: 'green.500' }}
              href="https://goerli.etherscan.io/address/0xacfc7725527ba2ee4311574f65e5d76f9f9585e9"
              target="_blank"
            >
              Ver contrato
            </Link>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          direction="column"
          justify={'right'}
          align={'center'}
          position={'relative'}
          w={'full'}
        >
          <Heading>{alreadyVote ? 'You already vote' : 'Vote'}</Heading>
          <HStack gap={4}>
            <VotingCard
              type="yes"
              votes={votesYes}
              totalVotes={totalVotes}
              vote={vote}
              isVoting={isVoting}
              disabled={!active || alreadyVote}
            />
            <VotingCard
              type="no"
              votes={votesNo}
              totalVotes={totalVotes}
              vote={vote}
              isVoting={isVoting}
              disabled={!active || alreadyVote}
            />
          </HStack>
          {active ? (
            <>
              <Flex mt={2}>
                <Badge ml={2}>
                  Address:
                  <Badge ml={1} colorScheme="green">
                    {account}
                  </Badge>
                </Badge>
              </Flex>
            </>
          ) : (
            <Badge variant="subtle" colorScheme="orange" mt={2}>
              Connect your wallet{' '}
            </Badge>
          )}
        </Flex>
      </Stack>
    </Layout>
  );
};
