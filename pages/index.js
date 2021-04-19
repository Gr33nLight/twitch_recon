import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { Input, Button, Link } from '@chakra-ui/react';

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
    <div className={styles.container}>
      <Input
        placeholder="Enter VOD URL"
        value={vodUrl}
        onChange={(e) => setVodUrl(e.target.value)}
      />
      <Input
        placeholder="Channel name"
        value={channel}
        onChange={(e) => setChannel(e.target.value)}
      />
      <Button colorScheme="blue" onClick={() => sendReq()}>
        Sync VOD
      </Button>
      {vodResult && (
        <Link href={vodResult} isExternal>
          Success! Here is your link to the VOD
        </Link>
      )}
    </div>
  );
}
