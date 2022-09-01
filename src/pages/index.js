import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Stack,
  Flex,
  Heading,
  Text,
  Button,
  Badge,
  useToast,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  StatArrow,
  Box,
  Switch,
  FormLabel,
} from "@chakra-ui/react";
import Web3Method from "@utils/web3";
import EthersMethod from "utils/ether";
import { useWeb3React } from "@web3-react/core";
import { CheckCircleIcon, CloseIcon, EmailIcon } from "@chakra-ui/icons";
import { AppContext } from "@context/AppContext";

const Home = () => {
  const { library, chainId, active } = useWeb3React();

  const { state, changeLibrary } = useContext(AppContext);

  const toast = useToast();

  const getData = async () => {
    if (active) {
      let web3;
      if (state.library === "web3") {
        web3 = new Web3Method(library?.web3.currentProvider, chainId);
      } else {
        web3 = new EthersMethod(chainId, library?.ethers);
      }

      const [votesForYes, votesForNo, voted] = await Promise.all([
        web3.votesForYes(),
        web3.votesForNo(),
        web3.getVote(),
      ]);
      setNegativeVotes(votesForNo);
      setPositiveVotes(votesForYes);
      setIsVoted(voted !== undefined);
    }
  };

  useMemo(() => {
    getData();
  }, [library, chainId, active]);

  const handleVote = async (vote) => {
    setVoting(true);
    const web3 = new Web3Method(library?.web3.currentProvider, chainId);
    try {
      const txHash = await web3.vote(vote);
      toast({
        title: "Vote emitted",
        description: txHash,
        status: "success",
      });
      getData();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
      });
    }
    setVoting(false);
  };

  return (
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
              bg: "green.400",
              zIndex: -1,
            }}
          >
            Un Platzi Punk
          </Text>
          <br />
          <Text as={"span"} color={"green.400"}>
            nunca para de aprender
          </Text>
        </Heading>
        <Text color={"gray.500"}>
          Platzi Punks es una colección de Avatares randomizados cuya metadata
          es almacenada on-chain. Poseen características únicas y sólo hay 10000
          en existencia.
        </Text>
        <Text color={"green.500"}>
          Cada Platzi Punk se genera de forma secuencial basado en tu address,
          usa la previsualización para averiguar cuál sería tu Platzi Punk si
          hace mint en este momento.
        </Text>
        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={{ base: "column", sm: "row" }}
        >
          <Button
            rounded={"full"}
            size={"lg"}
            fontWeight={"normal"}
            px={6}
            colorScheme={"green"}
            bg={"green.400"}
            _hover={{ bg: "green.500" }}
          >
            Obtén tu punk
          </Button>
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
            colorScheme="teal"
            size="lg"
            onChange={changeLibrary}
            isChecked={state.library === "ether"}
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
                    23.36%
                  </StatHelpText>
                  <Stack direction="row" spacing={4}>
                    <Button
                      leftIcon={<CheckCircleIcon />}
                      colorScheme="teal"
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
                    9.05%
                  </StatHelpText>
                  <Stack direction="row" spacing={4}>
                    <Button
                      leftIcon={<CloseIcon />}
                      colorScheme="teal"
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
              <Badge mt={2} colorScheme={"yellow"}>
                You are emitted vote for this proposal
              </Badge>
            ) : (
              ""
            )}
          </>
        ) : (
          <Badge mt={2}>Wallet desconectado</Badge>
        )}
      </Flex>
    </Stack>
  );
};

export default Home;
