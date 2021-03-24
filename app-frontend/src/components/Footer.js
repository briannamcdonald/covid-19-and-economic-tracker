import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex
      backgroundColor="gray.200"
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
