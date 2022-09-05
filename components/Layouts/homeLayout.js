import { motion } from 'framer-motion';
import Head from 'next/head';
import { Box, Container } from '@chakra-ui/react';

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 20 },
  exit: { opacity: 0, x: 0, y: 20 },
};

export const Layout = ({ children, title }) => {
  return (
    <motion.article
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.6, type: 'easeInOut' }}
      style={{ position: 'relative' }}
    >
      <>
        {title && (
          <Head>
            <title>Voting app</title>
          </Head>
        )}

        <Container display="flex" w="100%" maxW="1600px">
          {children}
        </Container>
      </>
    </motion.article>
  );
};
