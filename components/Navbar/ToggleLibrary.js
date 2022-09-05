import React, { useContext, useState } from 'react';
import { SiWeb3Dotjs } from 'react-icons/si';
import { FaEthereum } from 'react-icons/fa';
import { Switch, HStack } from '@chakra-ui/react';
import { AppContext } from '../context/appContext';

export const ToggleLibrary = () => {
  const styleEnable = { color: 'teal', fontSize: '1.5em' };
  const styleDisable = { color: 'gray', fontSize: '1.5em' };
  const context = useContext(AppContext);
  return (
    <HStack>
      <SiWeb3Dotjs
        style={context.library === 'web3' ? styleEnable : styleDisable}
      />
      <Switch
        size={'lg'}
        id="email-alerts"
        onChange={(e) => {
          context.changeLibrary();
        }}
      />
      <FaEthereum
        style={context.library === 'ethers' ? styleEnable : styleDisable}
      />
    </HStack>
  );
};
