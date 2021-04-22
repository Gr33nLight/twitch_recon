import Head from 'next/head';
import { useState } from 'react';
import { Input, Link, Box } from '@chakra-ui/react';
import ChannelSelect from '../components/ChannelSelect';
import VodSyncResult from '../components/VodSyncResult';
import Progress from '../components/Progress';

export default function Home() {
  const [vodUrl, setVodUrl] = useState('');
  const [vodResult, setVodResult] = useState(
    'verylongtestverylongtestverylongtest'
  );
  let resultTxt = 'Sync To';

  if (vodResult) {
    resultTxt = 'Success';
  }
  return (
    <Box
      minH={'calc(100vh - 60px)'}
      display="flex"
      justifyContent="center"
      flexDirection="column"
    >
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Box
          flex="1"
          fontSize={['40px', null, null, '70px']}
          alignSelf="center"
        >
          Twitch Recon
        </Box>
        <Box
          py={'0.5rem'}
          px={'0rem'}
          display={'flex'}
          flex="1"
          flexDirection={['column', 'row', 'row', 'row']}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Input
            placeholder="Enter VOD URL"
            value={vodUrl}
            w={[300, 190, 300]}
            onChange={(e) => {
              if (vodResult) setVodResult('');
              setVodUrl(e.target.value);
            }}
          />
          <Progress result={vodResult} />

          {!vodResult && (
            <ChannelSelect vodUrl={vodUrl} setVodResult={setVodResult} />
          )}
          {vodResult && (
            <VodSyncResult result={vodResult} setVodResult={setVodResult} />
          )}
        </Box>
      </Box>
    </Box>
  );
}
