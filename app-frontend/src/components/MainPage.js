import React, { useState } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';

import LocationDropdown from './Dropdowns/LocationDropdown';
import DataTypeDropdown from './Dropdowns/DataTypeDropdown';
import IndustryDropdown from './Dropdowns/IndustryDropdown';
import DynamicChart from './DynamicChart';

// Explanation of dropdown logic:
//  - Industry selection dropdown only appears when weekly earnings or employment has been selected as the data type.
//  - If CERB is selected as the data type, the location dropdown is set to Canada with no option to change it since
//    we only have CERB data for the whole country.

const MainPage = () => {
  const [type1, setType1] = useState('');
  const [type2, setType2] = useState('');
  const [location1, setLocation1] = useState('');
  const [location2, setLocation2] = useState('');

  const handleType1Change = e => {
    setType1(e.currentTarget.value);
    // if the type is CERB payments, set the location to Canada
    if (e.currentTarget.value === 'CERB Payments') {
      setLocation1('Canada');
    }
  };
  const handleType2Change = e => {
    setType2(e.currentTarget.value);
    if (e.currentTarget.value === 'CERB Payments') {
      setLocation2('Canada');
    }
  };
  const handleLocation1Change = e => setLocation1(e.currentTarget.value);
  const handleLocation2Change = e => setLocation2(e.currentTarget.value);

  const dropdowns = (
    <Flex justifyContent="space-between" width="100%" flexWrap="wrap">
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        // responsive styling for different screen sizes
        width={{ base: '100%', sm: 'auto' }}
      >
        <Flex flexDirection={{ base: 'column', xl: 'row' }} flexWrap="wrap">
          <DataTypeDropdown value={type1} onChange={handleType1Change} />
          {/* only show the industry dropdown when the type is weekly earnings or employment */}
          <IndustryDropdown
            display={type1 === 'Weekly Earnings' || type1 === 'Employment' ? 'block' : 'none'}
          />
        </Flex>
        <LocationDropdown
          value={location1}
          onChange={handleLocation1Change}
          isDisabled={type1 === 'CERB Payments' ? true : false}
        />
      </Flex>
      <Flex
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="space-between"
        width={{ base: '100%', sm: 'auto' }}
      >
        <Flex
          flexDirection={{ base: 'column', xl: 'row' }}
          flexWrap="wrap"
          width={{ base: '100%', sm: 'auto' }}
        >
          {/* show this industry dropdown when the screen is larger */}
          <IndustryDropdown
            display={{
              base: 'none',
              xl: type2 === 'Weekly Earnings' || type2 === 'Employment' ? 'block' : 'none',
            }}
          />
          <DataTypeDropdown value={type2} onChange={handleType2Change} />
          {/* show this industry dropdown when the screen is smaller */}
          <IndustryDropdown
            display={{
              base: type2 === 'Weekly Earnings' || type2 === 'Employment' ? 'block' : 'none',
              xl: 'none',
            }}
          />
        </Flex>
        <LocationDropdown
          value={location2}
          onChange={handleLocation2Change}
          isDisabled={type2 === 'CERB Payments' ? true : false}
        />
      </Flex>
    </Flex>
  );

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Box>Nav bar</Box>
      <Box
        // responsive styling for different screen sizes
        width={{ base: '100%', sm: '90%', md: '80%', xl: '70%' }}
        padding="1rem"
      >
        <Text margin="2rem 0 0.5rem auto" fontSize="2xl" fontWeight="bold">
          Explore and Compare Canada's COVID-19 and Economic Data
        </Text>
        {dropdowns}
        <Box
          height={{
            base: '35vh',
            sm: '40vh',
            md: '50vh',
            lg: '60vh',
            xl: '65vh',
          }}
          width="100%"
          overflow="auto"
          marginBottom="2rem"
          border="1px solid black"
          borderRadius="6px"
        >
          <DynamicChart
            type1={type1}
            type2={type2}
            location1={location1}
            location2={location2}
            dataObject1={{
              '01-2020' : 0,
              '02-2020' : 3,
              '03-2020' : 210,
              '04-2020' : 50,
              '05-2020' : 20,
              '06-2020' : 14,
              '07-2020' : 7,
              '08-2020' : 11,
              '09-2020' : 15,
              '10-2020' : 32,
              '11-2020' : 9,
              '12-2020' : 15
            }}
            dataObject2={{
              '01-2020' : 952,
              '02-2020' : 959,
              '03-2020' : 1100,
              '04-2020' : 1210,
              '05-2020' : 1130,
              '06-2020' : 1050,
              '07-2020' : 1000,
              '08-2020' : 958,
              '09-2020' : 953,
              '10-2020' : 945,
              '11-2020' : 958,
              '12-2020' : 967
            }}
          />
        </Box>
      </Box>
    </Flex>
  );
};

export default MainPage;
