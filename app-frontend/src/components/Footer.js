import React from 'react';
import { Flex, Text, useColorMode } from '@chakra-ui/react';

const Footer = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      // styling based on whether its in light mode or dark mode
      backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.600'}
      width="100%"
      justifyContent="center"
      alignItems="center"
      alignSelf="flex-end"
      padding="0.2rem"
      marginTop="2rem"
      position="absolute"
      bottom="0"
      left="0"
    >
      <Text>COVID-19 & Economic Tracker 2021</Text>
    </Flex>
  );
};

export default Footer;
