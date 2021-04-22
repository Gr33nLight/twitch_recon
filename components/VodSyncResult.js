import React from 'react';
import { Link, Box, IconButton, Icon, Text } from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';

const VodSyncResult = ({ result, setVodResult }) => {
  return (
    <Box padding="10px" bgColor="purple.400" display="inherit">
      <Text fontSize="md" color="gray.200">
        <Link href={result} isExternal>
          {result.substr(0, 31) + '...'}
        </Link>
      </Text>
      <Icon
        cursor="pointer"
        onClick={() => setVodResult('')}
        w="5"
        h="5"
        as={FaTrashAlt}
        color="gray.200"
        mt="2px"
        ml="10px"
      />
    </Box>
  );
};

export default VodSyncResult;