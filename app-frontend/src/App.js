import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import theme from './theme';

import MainPage from './components/MainPage';
import AboutPage from './components/AboutPage';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <HashRouter basename="/">
        <Switch>
          <Route exact path="/about" render={() => <AboutPage />} />
          <Route path="/" render={() => <MainPage />} />
        </Switch>
      </HashRouter>
    </ChakraProvider>
  );
}

export default App;
