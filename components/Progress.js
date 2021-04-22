import React from 'react';
import { FaAngleRight, FaCheck } from 'react-icons/fa';
import { Input, Link, Box, Icon } from '@chakra-ui/react';

const Progress = ({ result }) => {
  if (result) {
    return (
      <Box px="8px" display="inline-flex" alignItems="center">
        Success
        <FaCheck
          fontSize="1.5em"
          color="green"
          style={{
            marginLeft: '3px',
          }}
        />
      </Box>
    );
  } else {
    return (
      <Box px="5px" display="inline-flex" alignItems="center">
        Sync To
        <FaAngleRight style={{ height: '18px', marginLeft: '3px' }} />
      </Box>
    );
  }
};

export default Progress;
