import React, { useState } from 'react';
import { Flex, Box, Text, useColorMode } from '@chakra-ui/react';
import FadeIn from 'react-fade-in';
import axios from 'axios';

import Dropdowns from './Dropdowns';
import ChartTypeDropdown from './Dropdowns/ChartTypeDropdown';
import DynamicChart from './DynamicChart';
import Footer from './Footer';
import NavBar from './NavigationBar';

// Explanation of dropdown logic:
//  - Industry selection dropdown only appears when weekly earnings or employment has been selected as the data type.
//  - If CERB is selected as the data type, the location dropdown is set to Canada with no option to change it since
//    we only have CERB data for the whole country.

const MainPage = () => {
  const { colorMode } = useColorMode();
  const [dropdownState, setDropdownState] = useState({
    type1: 'COVID-19 Cases',
    type2: 'COVID-19 Cases',
    location1: 'Quebec',
    location2: 'Ontario',
    industry1: 'Industrial aggregate including unclassified businesses',
    industry2: 'Industrial aggregate including unclassified businesses',
    chartType: 'Line Chart',
  });

  const handleDropdownChange = (e, id) => {
    switch (id) {
      case 'type1':
        // if the type is CERB payments, set the location to Canada
        let location1 =
          e.currentTarget.value === 'CERB Payments'
            ? 'Canada'
            : dropdownState.location1;
        setDropdownState({
          ...dropdownState,
          type1: e.currentTarget.value,
          location1: location1,
        });
        break;

      case 'type2':
        let location2 =
          e.currentTarget.value === 'CERB Payments'
            ? 'Canada'
            : dropdownState.location2;
        setDropdownState({
          ...dropdownState,
          type2: e.currentTarget.value,
          location2: location2,
        });
        break;

      case 'location1':
        setDropdownState({
          ...dropdownState,
          location1: e.currentTarget.value,
        });
        break;

      case 'location2':
        setDropdownState({
          ...dropdownState,
          location2: e.currentTarget.value,
        });
        break;

      case 'industry1':
        setDropdownState({
          ...dropdownState,
          industry1: e.currentTarget.value,
        });
        break;

      case 'industry2':
        setDropdownState({
          ...dropdownState,
          industry2: e.currentTarget.value,
        });
        break;

      case 'chartType':
        setDropdownState({
          ...dropdownState,
          chartType: e.currentTarget.value,
        });
        break;

      default:
        break;
    }
  };

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      // styling based on whether its in light mode or dark mode
      backgroundColor={colorMode === 'light' ? 'white' : 'gray.800'}
    >
      <NavBar />
      <Box
        // responsive styling for different screen sizes
        width={{ base: '100%', sm: '90%', md: '80%', xl: '70%' }}
        padding="1rem"
        marginBottom="2rem"
        marginTop="5rem"
      >
        <FadeIn>
          <Text margin="0.5rem 0 0.5rem auto" fontSize="2xl" fontWeight="bold">
            Explore and Compare Canada's COVID-19 and Economic Data
          </Text>
          <Dropdowns
            dropdownState={dropdownState}
            handleDropdownChange={handleDropdownChange}
          />
          <Box
            height={{
              base: '40vh',
              sm: '45vh',
              md: '55vh',
              lg: '65vh',
              xl: '70vh',
            }}
            width="100%"
            overflow="auto"
            marginBottom="2rem"
            border="1px solid"
            borderRadius="6px"
            backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.700'}
          >
            <ChartTypeDropdown
              value={dropdownState.chartType}
              onChange={e => handleDropdownChange(e, 'chartType')}
              style={{ position: 'center' }}
            />
            <div style={{ height: '80%', width: '95%', margin: '2%' }}>
              <DynamicChart
                type1={dropdownState.type1}
                type2={dropdownState.type2}
                location1={dropdownState.location1}
                location2={dropdownState.location2}
                industry1={dropdownState.industry1}
                industry2={dropdownState.industry2}
                chartType={dropdownState.chartType}
              />
            </div>
          </Box>
        </FadeIn>
      </Box>
      <Footer />
    </Flex>
  );
};

export default MainPage;
