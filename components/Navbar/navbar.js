import React, { useState } from 'react';
import { Logo } from './Logo';
import NextLink from 'next/link';
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { ToggleTheme } from '../Theme/toggleTheme';
import { ToggleLibrary } from './ToggleLibrary';
import { Wallet } from '../Wallet';

const LinkItem = ({ href, path, children }) => {
  const active = path === href;

  const inactiveColor = useColorModeValue('gray.200', 'whiteAlpha.900');
  return (
    <NextLink href={href}>
      <Link
        p={2}
        bg={active ? 'glassTeal' : undefined}
        color={active ? '#202023' : inactiveColor}
      >
        {children}
      </Link>
    </NextLink>
  );
};

export const Navbar = (props) => {
  const { path } = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue('#ffffff40', '#20202380')}
      style={{ backdropFilter: 'blur(10px' }}
      zIndex={1}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.xl"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            <Logo />
          </Heading>
        </Flex>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, nmd: 0 }}
        >
          <LinkItem href="https://github.com/alberto-sc" path={path}>
            Source
          </LinkItem>
        </Stack>
        <Box
          display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
          flexBasis={{ base: '100%', md: 'auto' }}
          flex={1}
          align="right"
        >
          <Stack
            spacing={8}
            align="center"
            justify={['center', 'space-between', 'flex-end', 'flex-end']}
            direction={['column', 'row', 'row', 'row']}
            pt={[4, 4, 0, 0]}
          >
            {/* <MenuItem to="/">Home</MenuItem> */}
            <ToggleTheme />
            <ToggleLibrary />
            <Wallet />
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
