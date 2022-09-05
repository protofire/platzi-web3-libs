import Link from 'next/link';
import Image from 'next/image';
import { Text, useColorModeValue } from '@chakra-ui/react';
import { VscRocket } from 'react-icons/vsc';

import styled from '@emotion/styled';

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;

  &:hover img {
    transform: rotate(20deg);
  }
`;

export const Logo = () => {
  const footPrintImg = `/images/`;

  return (
    <Link href="/">
      <a>
        <LogoBox>
          <VscRocket />
          <Text
            color={useColorModeValue('gray.800', 'whiteAlpha.900')}
            fontFamily="M PLUS Rounded 1c"
            fontWeight="bold"
          >
            &nbsp; &nbsp; Web 3 libraries
          </Text>
        </LogoBox>
      </a>
    </Link>
  );
};
