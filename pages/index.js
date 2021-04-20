import Head from 'next/head';
// import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { Input, Button, Link, Box, Heading } from '@chakra-ui/react';

export default function Home() {
  const [vodUrl, setVodUrl] = useState('');
  const [channel, setChannel] = useState('');
  const [vodResult, setVodResult] = useState('');
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
          // minH={'calc(100vh - 60px)'}
          py={'0.5rem'}
          px={'0rem'}
          display={'flex'}
          flex="1"
          flexDirection={['column', 'row', 'row', 'row']}
          // flexDirection="column"
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Input
            placeholder="Enter VOD URL"
            value={vodUrl}
            w={[300, 190, 300]}
            onChange={(e) => setVodUrl(e.target.value)}
          />

          <Box
            fllex="1"
            lineHeight="0"
            verticalAlign="0"
            marginTop={['10px', '0px']}
          >
            <Input
              placeholder="Channel name"
              value={channel}
              verticalAlign="none"
              w={[300, 180, 290]}
              onChange={(e) => setChannel(e.target.value)}
            />
            <Button
              verticalAlign="baseline"
              height={39}
              margin="0px auto"
              mt={['10px', '0px']}
              colorScheme="red"
              // display={{ base: 'block', sm: 'initial' }}
              display={['block', 'initial']}
              onClick={() => sendReq()}
            >
              Sync VOD
            </Button>
          </Box>

          {vodResult && (
            <Link href={vodResult} isExternal>
              Success! Here is your link to the VOD
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
}
