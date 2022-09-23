import {
  Box,
  Heading,
  Image,
  Text,
  Flex,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import platziLogo from '../../static/platzi.svg';

const Footer = () => {
  return (
    <Box>
      <Box py={10}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            ml: 8,
          }}>
          <Image src={platziLogo} width="80px"/>
          <Heading size="md" color="purple.400" mt={0.2} ml={1}>
            Challenge 
          </Heading>
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          © {new Date().getFullYear()} Original resolved by
            <Link
              ml={1}
              href='https://github.com/IvySaskia'
              isExternal
            >
              Ivy Saskia
            </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
