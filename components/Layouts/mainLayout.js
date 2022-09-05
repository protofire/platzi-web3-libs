import React from 'react';
import Head from 'next/head';
import { Box, Container } from '@chakra-ui/react';
import { Navbar } from '../Navbar/navbar';
import { Blob } from '../Background/blob';

export const Layout = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Web 3 libraries</title>
      </Head>
      <Navbar />
      <Container maxW="container.lg" position="absolute">
        <Blob />
        {children}
      </Container>
    </Box>
  );
};
