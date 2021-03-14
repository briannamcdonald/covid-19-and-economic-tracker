import React from 'react';
import { ChakraProvider, Box, Text, theme } from '@chakra-ui/react';

import MainPage from './components/MainPage';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainPage />
    </ChakraProvider>
  );
}

export default App;
