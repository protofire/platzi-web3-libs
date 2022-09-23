import React, { useContext } from "react";
import {
  Stack,
  Flex,
  Heading,
  Link,
  Text,
  Button,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  StatArrow,
  Box,
  Switch,
  FormLabel,
  Highlight,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import { AppContext } from "../context/AppContext";
import useProposalStatus from "../hooks/useProposalStatus";
import { BsFillAlarmFill } from "react-icons/bs";

const Home = () => {
  const { active } = useWeb3React();
  const { state, changeLibrary } = useContext(AppContext);
  const {
    positiveVotes,
    negativesVotes,
    voting,
    handleVote,
    isVoted,
    percentNo,
    percentYes,
  } = useProposalStatus();

  return (
    <>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column-reverse", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "purple.400",
                zIndex: -1,
              }}
            >
              Platzi Challenge Web3 vs EtherJS
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            <Highlight query={"Ethereum Developer Program (EthDevProgram)"} styles={{ color: "purple.500" }}>
              A challenge by Platzi on Ethereum Developer Program (EthDevProgram). This is a DApp that allows people to vote on a (binary) proposal. Each ethereum address should be allowed to vote only once and the vote should cost 0.01 ETH.
            </Highlight>
          </Text>
          <Text color={"purple.500"}>
            You can switch between WEB3.JS and ETHERS.JSlibraries and everything work the same.
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Link
              href='https://github.com/IvySaskia/platzi-web3-libs.git'
              isExternal
            >
              <Button
                leftIcon={<BsFillAlarmFill />}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                colorScheme={"purple"}
              >
                Visit the repository
              </Button>
            </Link>            
          </Stack>
        </Stack>
        <Flex
          flex={1}
          direction="column"
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Stack direction="row" mb={12}>
            <FormLabel htmlFor="email-alerts" mb="0">
              Web3
            </FormLabel>
            <Switch
              colorScheme="purple"
              size="lg"
              onChange={changeLibrary}
              isChecked={state.library === "ethers"}
            />
            <FormLabel htmlFor="email-alerts" mb="0">
              EtherJS
            </FormLabel>
          </Stack>
          {active ? (
            <>
              <StatGroup width={"100%"}>
                <Stat>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems="center"
                  >
                    <StatLabel>Vote for yes</StatLabel>
                    <StatNumber>{positiveVotes}</StatNumber>
                    <StatHelpText>
                      <StatArrow type="increase" />
                      {`${percentYes}%`}
                    </StatHelpText>
                    <Stack direction="row" spacing={4}>
                      <Button
                        leftIcon={<CheckCircleIcon />}
                        colorScheme="purple"
                        variant="solid"
                        isLoading={voting}
                        isDisabled={isVoted}
                        onClick={() => handleVote(2)}
                      >
                        Yes
                      </Button>
                    </Stack>
                  </Box>
                </Stat>

                <Stat>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems="center"
                  >
                    <StatLabel>Vote for no</StatLabel>
                    <StatNumber>{negativesVotes}</StatNumber>
                    <StatHelpText>
                      <StatArrow type="decrease" />
                      {`${percentNo}%`}
                    </StatHelpText>
                    <Stack direction="row" spacing={4}>
                      <Button
                        leftIcon={<CloseIcon />}
                        colorScheme="purple"
                        variant="outline"
                        isLoading={voting}
                        isDisabled={isVoted}
                        onClick={() => handleVote(1)}
                      >
                        No
                      </Button>
                    </Stack>
                  </Box>
                </Stat>
              </StatGroup>
              {isVoted ? (
                <Badge mt={2} colorScheme={"purple"}>
                  You Already Voted
                </Badge>
              ) : (
                <Badge mt={2} colorScheme={"purple"}>
                  You can vote NOW
                </Badge>
              )}
            </>
          ) : (
              <Badge
                mt={2}
                colorScheme='red'
              >
                Wallet desconected
              </Badge>
          )}
        </Flex>
      </Stack>
    </>
  );
};

export default Home;

