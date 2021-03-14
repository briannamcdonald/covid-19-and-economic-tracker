import React, { useState } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';

import LocationDropdown from './Dropdowns/LocationDropdown';
import DataTypeDropdown from './Dropdowns/DataTypeDropdown';
import IndustryDropdown from './Dropdowns/IndustryDropdown';

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

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Box>Nav bar</Box>
      <Box width="80%">
        <Text margin="2rem 0 0.5rem auto" fontSize="2xl" fontWeight="bold">
          Explore and Compare Canada's COVID-19 and Economic Data
        </Text>
        <Flex justifyContent="space-between" width="100%">
          <Flex flexDirection="column">
            <Flex>
              <DataTypeDropdown value={type1} onChange={handleType1Change} />
              {/* only show the industry dropdown when the type is weekly earnings or employment */}
              {type1 === 'Weekly Earnings' || type1 === 'Employment' ? (
                <IndustryDropdown />
              ) : null}
            </Flex>
            <LocationDropdown
              value={location1}
              onChange={handleLocation1Change}
              isDisabled={type1 === 'CERB Payments' ? true : false}
            />
          </Flex>
          <Flex flexDirection="column" alignItems="flex-end">
            <Flex>
              {/* only show the industry dropdown when the type is weekly earnings or employment */}
              {type2 === 'Weekly Earnings' || type2 === 'Employment' ? (
                <IndustryDropdown />
              ) : null}
              <DataTypeDropdown value={type2} onChange={handleType2Change} />
            </Flex>
            <LocationDropdown
              value={location2}
              onChange={handleLocation2Change}
              isDisabled={type2 === 'CERB Payments' ? true : false}
            />
          </Flex>
        </Flex>
        <Box
          height="70vh"
          width="100%"
          border="1px solid black"
          borderRadius="6px"
          marginBottom="2rem"
        >
          Chart
        </Box>
      </Box>
    </Flex>
  );
};

export default MainPage;
