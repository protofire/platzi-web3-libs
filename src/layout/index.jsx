import {
  Box,
  Flex,
} from "@chakra-ui/react";
import Header from "./header";
import Footer from "./footer";

const MainLayout = ({ children }) => {
  return (
    <Flex minH="100vh" direction="column">
      <Header />
      <Box mx="auto" flex={1} p={4} maxW={"7xl"} width="100%">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default MainLayout;
