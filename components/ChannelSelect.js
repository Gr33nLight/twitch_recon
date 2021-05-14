import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, IconButton, Icon, useToast, Flex } from '@chakra-ui/react';
import { FaSyncAlt } from 'react-icons/fa';
import { en_us } from '../language/en_us';

const ChannelSelect = ({ vodUrl, setVodResult, loading, setLoading }) => {
  const [channel, setChannel] = useState('');
  const toast = useToast();

  const sendReq = async () => {
    setLoading(true);
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
      setLoading(false);
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
      setLoading(false);
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
    <Flex
      lineHeight="0"
      verticalAlign="0"
      marginTop={['5px', '0px']}
      display={['block', 'inherit']}
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
    >
      <Input
        placeholder="Channel name"
        value={channel}
        verticalAlign="none"
        w={[310, 180, 260]}
        onChange={(e) => setChannel(e.target.value)}
      />
      <IconButton
        aria-label="Sync"
        verticalAlign="baseline"
        height={39}
        disabled={loading}
        margin="0px auto"
        type="submit"
        mt={['10px', '0px']}
        colorScheme="purple"
        display={['block', 'content']}
        onClick={() => sendReq()}
        icon={<Icon w="5" h="5" as={FaSyncAlt} />}
      />
    </Flex>
  );
};

//vodUrl, setVodResult, loading, setLoading
ChannelSelect.propTypes = {
  vodUrl: PropTypes.string,
  setVodResult: PropTypes.func,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
};

export default ChannelSelect;
