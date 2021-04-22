import React, { useState } from 'react';
import { Input, Box, IconButton, Icon } from '@chakra-ui/react';
import { FaSyncAlt } from 'react-icons/fa';

const ChannelSelect = ({ vodUrl, setVodResult }) => {
  const [channel, setChannel] = useState('');

  const sendReq = async () => {
    const duration = String.raw`(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)`;
    const vId = String.raw`\d\d\d\d\d\d\d\d\d`;

    const videoWithTimestampRE = new RegExp(`(${vId})(?:\\?t=(${duration}))?`);

    const match = vodUrl.match(videoWithTimestampRE);

    if (match && match.length == 6) {
      const vod_id = match[1];
      let seconds =
        parseInt(match[3]) * 3600 +
        parseInt(match[4]) * 60 +
        parseInt(match[5]);
      const res = await fetch(`/api/sync/${vod_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ timestamp: seconds, channel }), // body data type must match "Content-Type" header
      });

      const vodSync = await res.json();
      setVodResult(vodSync?.vodinfo?.url);
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
