import {
	Box,
	Flex,
	HStack,
	useColorModeValue,
	Heading,
	Select,
} from '@chakra-ui/react';
import Footer from './footer';
import WalletData from './wallet-data';
import { useContext } from 'react';
import { LibContext } from '../../App';

const MainLayout = ({ children }) => {
	const { setLib } = useContext(LibContext);

	const handleChange = (event) => {
		event.preventDefault();
		setLib(event.target.value);
	};

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
					<HStack spacing={8} alignItems={'center'}>
						<Flex alignItems="center">
							<Heading size="md" color="orange" mt={0.2} ml={1}>
								Web3 Libs
							</Heading>
						</Flex>
					</HStack>
					<HStack>
						<Select
							placeholder="Choose library"
							onChange={handleChange}
							color="orange"
						>
							<option value="opt_web3" bg={'black'}>
								web3.js
							</option>
							<option value="opt_ethers">ethers.js</option>
						</Select>
						<WalletData />
					</HStack>
				</Flex>
			</Box>
			<Box mx="auto" flex={1} p={4} maxW={'7xl'} width="100%" bg="black">
				{children}
			</Box>
			<Footer />
		</Flex>
	);
};

export default MainLayout;
