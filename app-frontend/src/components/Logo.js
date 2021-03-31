import React from 'react';
import { Flex, Text, Image } from '@chakra-ui/react';

const Logo = () => {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Image src="./Images/logo.png" boxSize="2rem" borderRadius="md"></Image>
      <Text
        fontSize="lg"
        fontWeight="bold"
        marginLeft="0.5rem"
        display={{ base: 'none', md: 'flex' }}
      >
        COVID-19 & Economic Tracker
      </Text>
    </Flex>
  );
};

export default Logo;
