import {
  Box,
  Flex,
} from "@chakra-ui/react";
import NavLink from "./NavLink";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <Flex minH="100vh" direction="column">
      <NavLink/>
      <Box mx="auto" flex={1} p={4} maxW={"7xl"} width="100%">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default MainLayout;
