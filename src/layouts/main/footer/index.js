import {
	Box,
	Container,
	Stack,
	Text,
	Link,
	useColorModeValue,
	Image,
} from '@chakra-ui/react';

const Footer = () => {
	return (
		<Box
			bg={useColorModeValue('black', 'black')}
			color={useColorModeValue('white', 'white')}
		>
			<Box
				borderTopWidth={1}
				borderStyle={'solid'}
				borderColor={useColorModeValue('gray.200', 'gray.700')}
			>
				<Container
					as={Stack}
					maxW={'6xl'}
					py={4}
					direction={{ base: 'column', md: 'row' }}
					spacing={4}
					justify={{ base: 'center', md: 'space-between' }}
					align={{ base: 'center', md: 'center' }}
				>
					<Text>
						© Developed by
						<Link
							ml={1}
							href="https://twitter.com/__andiazo__"
							color={'orange'}
						>
							Andrés Díaz
						</Link>{' '}| Repo: 
            <Link
							ml={1}
							href="https://github.com/andiazo/platzi-web3-libs"
							color={'orange'}
						>
            https://github.com/andiazo/platzi-web3-libs
						</Link>
            
					</Text>
					<Image src="./logo.svg" />
				</Container>
			</Box>
		</Box>
	);
};

export default Footer;
