import {
  Box,
  Flex,
  HStack,
  useColorModeValue,
  Stack,
  Image,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NavLink from "@layout/NavLink";
import Footer from "@layout/Footer";
import Wallet from "@layout/Wallet";
import Logo from "../static/platzi.svg";

const Links = [
  {
    name: "Home",
    to: "/",
  },
];

const Layout = ({ children }) => {
  return (
    <Flex minH="100vh" direction="column">
      <Box
        mx="auto"
        maxW={"7xl"}
        width="100%"
        bg={useColorModeValue("white", "gray.800")}
        px={4}
      >
        <Flex
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <HStack spacing={8} alignItems={"center"}>
            <Flex alignItems="center">
              <Image src={Logo.src} width="80px" />
              <Heading size="md" color="blue.200" mt={0.2} ml={1}>
                Challenge
              </Heading>
            </Flex>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map(({ name, to }) => (
                <NavLink key={name} to={to}>
                  {name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Wallet />
        </Flex>
      </Box>
      <Box mx="auto" flex={1} p={4} maxW={"7xl"} width="100%">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
