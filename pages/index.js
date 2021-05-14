import React from 'react';
import { useState } from 'react';
import { Input, Box, Flex } from '@chakra-ui/react';
import ChannelSelect from '../components/ChannelSelect';
import VodSyncResult from '../components/VodSyncResult';
import Progress from '../components/Progress';
import { use100vh } from 'react-div-100vh';

export default function Home() {
  const [vodUrl, setVodUrl] = useState('');
  const [vodResult, setVodResult] = useState('');
  const [loading, setLoading] = useState();
  const height = use100vh();

  return (
    <Box
      height={height || '100vh'}
      //for use with navbar
      // height={`calc(${height}px - 60px)`}
      display="flex"
      justifyContent="center"
      flexDirection="column"
      className="home"
      pb="100px"
    >
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Box
          flex="1"
          fontSize={['40px', null, null, '70px']}
          alignSelf="center"
        >
          Twitch Recon
        </Box>

        {/* Main Search Component */}

        <form onSubmit={(e) => e.preventDefault()}>
          <Flex
            py={'0.5rem'}
            px={'0rem'}
            flex="1"
            flexDirection={['column', 'row', 'row', 'row']}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Input
              placeholder="Enter VOD URL"
              value={vodUrl}
              w={[310, 190, 300]}
              marginBottom={['5px', '0px']}
              onChange={(e) => {
                if (vodResult) setVodResult('');
                setVodUrl(e.target.value);
              }}
            />
            <Progress result={vodResult} loading={loading} />

            {!vodResult && (
              <ChannelSelect
                vodUrl={vodUrl}
                setVodResult={setVodResult}
                loading={loading}
                setLoading={setLoading}
              />
            )}
            {vodResult && (
              <VodSyncResult
                result={vodResult}
                setVodResult={setVodResult}
                setVodUrl={setVodUrl}
              />
            )}
          </Flex>
        </form>
      </Box>
    </Box>
  );
}
