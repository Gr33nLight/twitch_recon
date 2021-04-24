import React, { useState } from 'react';
import { Input, Box, IconButton, Icon, useToast } from '@chakra-ui/react';
import { FaSyncAlt } from 'react-icons/fa';
import { en_us } from '../language/en_us';

const ChannelSelect = ({ vodUrl, setVodResult }) => {
  const [channel, setChannel] = useState('');
  const toast = useToast();

  const sendReq = async () => {
    const duration = String.raw`(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)`;
    const vId = String.raw`\d\d\d\d\d\d\d\d\d`;

    const videoWithTimestampRE = new RegExp(`(${vId})(?:\\?t=(${duration}))?`);

    const match = vodUrl.match(videoWithTimestampRE);

    if (match && match.length == 6) {
      const vod_id = match[1];
      let seconds =
        parseInt(match[3] || 0) * 3600 +
        parseInt(match[4] || 0) * 60 +
        parseInt(match[5]);

      const res = await fetch(`/api/sync/${vod_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ timestamp: seconds, channel }), // body data type must match "Content-Type" header
      });

      const vodSync = await res.json();
      if (vodSync?.err_code) {
        toast({
          title: 'Error',
          description: en_us[vodSync?.err_code],
          status: 'error',
          duration: 2000,
          position: 'top',
          isClosable: true,
        });
      } else {
        setVodResult(vodSync?.vodinfo?.url);
      }
    } else {
      toast({
        title: 'Error',
        description: en_us['ERR_SRC_FORMAT'],
        status: 'error',
        duration: 2000,
        position: 'top',
        isClosable: true,
      });
    }
  };
  return (
    <Box fllex="1" lineHeight="0" verticalAlign="0" marginTop={['10px', '0px']}>
      <Input
        placeholder="Channel name"
        value={channel}
        verticalAlign="none"
        w={[300, 180, 290]}
        onChange={(e) => setChannel(e.target.value)}
      />
      <IconButton
        aria-label="Sync"
        verticalAlign="baseline"
        height={39}
        margin="0px auto"
        mt={['10px', '0px']}
        colorScheme="purple"
        display={['block', 'initial']}
        onClick={() => sendReq()}
        icon={<Icon w="5" h="5" as={FaSyncAlt} />}
      />
    </Box>
  );
};

export default ChannelSelect;
