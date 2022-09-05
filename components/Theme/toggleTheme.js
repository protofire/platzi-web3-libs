import React from 'react';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { AnimationButtonLayout } from '../Layouts/animationButtonLayout';

export const ToggleTheme = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <AnimationButtonLayout>
      <IconButton
        aria-label="Toggle theme"
        colorScheme={useColorModeValue('purple', 'orange')}
        icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
        onClick={toggleColorMode}
      ></IconButton>
    </AnimationButtonLayout>
  );
};
