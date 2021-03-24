import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import MainPage from './components/MainPage';
import AboutPage from './components/AboutPage';

function App() {
  return (
    <ChakraProvider theme={theme}>
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
