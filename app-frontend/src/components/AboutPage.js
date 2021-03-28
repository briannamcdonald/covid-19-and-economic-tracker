import React from 'react';
import { Box, Flex, Text, Switch, useColorMode } from '@chakra-ui/react';
import FadeIn from 'react-fade-in';
import Footer from './Footer';
import NavBar from './NavigationBar';

const AboutPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      // styling based on whether its in light mode or dark mode
      backgroundColor={colorMode === 'light' ? 'white' : 'gray.800'}
    >
      <Box position="absolute" top="0">
        <Switch
          colorScheme="gray"
          onChange={() => toggleColorMode(!colorMode)}
        />
      </Box>
      <NavBar />
      <Flex
        flexDirection="column"
        /* responsive styling for different screen sizes */
        width={{ base: '100%', sm: '90%', md: '80%', xl: '70%' }}
        padding="1rem"
        marginX="auto"
        marginTop="6rem"
        marginBottom="3rem"
        backgroundColor={{
          base: 'transparent',
          sm: colorMode === 'light' ? 'gray.100' : 'gray.700',
        }}
        borderRadius="6px"
        border={{ base: 'none', sm: '2px solid' }}
      >
        <FadeIn>
          <Text fontSize="2xl" fontWeight="bold">
            About the Project
          </Text>
          <br />
          <Text>
            The <b>COVID-19 & Economic Tracker</b> was created in order to help
            people gain an understanding of the impact of COVID-19 on Canada's
            economy. Our application does this by providing users with data
            visualizations that allow for direct comparisons between COVID-19
            cases and economic data.
          </Text>
          <br />
          <Text>
            The economic data we provide includes data on CERB payments,
            employment numbers, and weekly earnings in Canada. We allow the user
            to select these types of data for specific provinces and industries
            where applicable.
          </Text>
          <br />
          <Text>
            This allows the user to make queries on various types of data, for
            either the same or different locations, in order to visually see
            correlations or differences between the selected data.
          </Text>
          <br />
          <Text>
            {' '}
            This is useful for understanding how different provinces have been
            affected differently by the pandemic, as well as how Canada's
            economy as a whole has changed over the past year because of
            COVID-19.
          </Text>
        </FadeIn>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default AboutPage;
