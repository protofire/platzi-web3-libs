import {
  Box,
  Center,
  useColorModeValue,
  Text,
  Stack,
  Button,
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
  HStack,
} from '@chakra-ui/react';
import { BiLike, BiDislike } from 'react-icons/bi';
import { MdHowToVote } from 'react-icons/md';

export const VotingCard = ({
  type,
  votes,
  totalVotes,
  vote,
  isVoting,
  disabled,
}) => {
  const percentage = (votes * 100) / totalVotes;
  const style = {
    padding: 7,
    display: 'inline-block',
    borderRadius: '10px',
    marginLeft: 'auto',
    marginRight: 'auto',
  };
  let iconStyles = { color: 'white', fontSize: '15em' };
  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'blackAlpha.400')}
        // boxShadow="2xl"
        boxShadow={useColorModeValue('2xl', 'xl')}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            background: type === 'yes' ? 'teal.400' : 'red.400',
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}
        >
          <Box
            style={style}
            background={type === 'yes' ? 'teal.400' : 'red.400'}
          >
            {type === 'yes' ? (
              <BiLike style={iconStyles} />
            ) : (
              <BiDislike style={iconStyles} />
            )}
          </Box>
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            Vote for {type}
          </Text>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Stat>
              <HStack>
                <StatNumber>{votes}</StatNumber>
                <StatHelpText>
                  <StatArrow type={percentage < 50 ? 'decrease' : 'increase'} />
                  {percentage}%
                </StatHelpText>
              </HStack>
            </Stat>
          </Box>
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
              $0.01 Eth
            </Text>
            <Button
              rightIcon={<MdHowToVote />}
              colorScheme="blue"
              variant="outline"
              onClick={() => {
                if (type === 'yes') vote(2);
                else vote(1);
              }}
              isLoading={isVoting}
              disabled={disabled}
            >
              Vote
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};
