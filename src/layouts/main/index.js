import {
	Box,
	Flex,
	HStack,
	IconButton,
	useDisclosure,
	useColorModeValue,
	Stack,
	Heading,
  Select
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NavLink from './nav-link';
import Footer from './footer';
import WalletData from './wallet-data';

const Links = [
	{
		name: 'Home',
		to: '/',
	},
];

const MainLayout = ({ children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
  const handleChange = (event) => {
    event.preventDefault();
    console.log(event.target.value)
  }
  
	return (
		<Flex minH="100vh" direction="column">
			<Box
				mx="auto"
				maxW={'7xl'}
				width="100%"
				bg={useColorModeValue('black', 'black')}
				px={4}
			>
				<Flex
					bg={useColorModeValue('black', 'black')}
					color={useColorModeValue('white', 'white')}
					minH={'60px'}
					py={{ base: 2 }}
					px={{ base: 4 }}
					borderBottom={1}
					borderStyle={'solid'}
					borderColor={useColorModeValue('black', 'black')}
					alignItems={'center'}
					justifyContent={'space-between'}
				>
					<IconButton
						size={'md'}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={'Open Menu'}
						display={{ md: 'none' }}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack spacing={8} alignItems={'center'}>
						<Flex alignItems="center">
							<Heading size="md" color="orange" mt={0.2} ml={1}>
								Web3 Libs
							</Heading>
						</Flex>
						<HStack
							as={'nav'}
							spacing={4}
							display={{ base: 'none', md: 'flex' }}
						>
							{Links.map(({ name, to }) => (
								<NavLink key={name} to={to}>
									{name}
								</NavLink>
							))}
						</HStack>
					</HStack>
					<HStack>
            <Select placeholder='Choose library' onChange={handleChange} color='orange' >
              <option value='opt_web3' bg={'black'}>web3.js</option>
              <option value='opt_ethers'>ethers.js</option>
            </Select>
						<WalletData />
					</HStack>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: 'none' }}>
						<Stack as={'nav'} spacing={4}>
							{Links.map(({ name, to }) => (
								<NavLink key={name} to={to}>
									{name}
								</NavLink>
							))}
						</Stack>
					</Box>
				) : null}
			</Box>
			<Box mx="auto" flex={1} p={4} maxW={'7xl'} width="100%">
				{children}
			</Box>
			<Footer />
		</Flex>
	);
};

export default MainLayout;
