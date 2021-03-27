import React, { useState } from 'react';
import { Flex, Box, Text, Switch, useColorMode } from '@chakra-ui/react';
import FadeIn from 'react-fade-in';

import Dropdowns from './Dropdowns';
import ChartTypeDropdown from './Dropdowns/ChartTypeDropdown';
import DynamicChart from './DynamicChart';
import Footer from './Footer';

// Explanation of dropdown logic:
//  - Industry selection dropdown only appears when weekly earnings or employment has been selected as the data type.
//  - If CERB is selected as the data type, the location dropdown is set to Canada with no option to change it since
//    we only have CERB data for the whole country.

const MainPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [dropdownState, setDropdownState] = useState({
    type1: '',
    type2: '',
    location1: '',
    location2: '',
    industry1: '',
    industry2: '',
    chartType: 'Line Chart',
  });
  const [chartState, setChartState] = useState({
    dataObject1: {
      '01-2020': 0,
      '02-2020': 3,
      '03-2020': 210,
      '04-2020': 50,
      '05-2020': 20,
      '06-2020': 14,
      '07-2020': 7,
      '08-2020': 11,
      '09-2020': 15,
      '10-2020': 32,
      '11-2020': 9,
      '12-2020': 15,
    },
    dataObject2: {
      '01-2020': 952,
      '02-2020': 959,
      '03-2020': 1100,
      '04-2020': 1210,
      '05-2020': 1130,
      '06-2020': 1050,
      '07-2020': 1000,
      '08-2020': 958,
      '09-2020': 953,
      '10-2020': 945,
      '11-2020': 958,
      '12-2020': 967,
    },
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
      <Box position="absolute" top="0">
        Nav bar
        <Switch
          colorScheme="gray"
          onChange={() => toggleColorMode(!colorMode)}
        />
      </Box>
      <Box
        // responsive styling for different screen sizes
        width={{ base: '100%', sm: '90%', md: '80%', xl: '70%' }}
        padding="1rem"
      >
        <FadeIn>
          <Text margin="2rem 0 0.5rem auto" fontSize="2xl" fontWeight="bold">
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
                dataObject1={chartState.dataObject1}
                dataObject2={chartState.dataObject2}
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
