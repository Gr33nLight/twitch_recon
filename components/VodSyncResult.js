import React from "react";
import { Link, Box, Icon, Text } from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";

const VodSyncResult = ({ result, setVodResult, setVodUrl }) => {
  return (
    <Box
      padding="10px"
      bgColor="purple.400"
      width="300px"
      display="inherit"
      marginTop={["5px", "0px"]}
    >
      <Text fontSize="md" color="gray.200" width="100%">
        <Link href={result} isExternal>
          {result.substr(0, 31) + (result.length > 31 ? "..." : "")}
        </Link>
      </Text>
      <Icon
        cursor="pointer"
        onClick={() => {
          setVodResult("");
          setVodUrl("");
        }}
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
