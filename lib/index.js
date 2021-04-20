const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_ENDPOINT_AUTH = 'https://id.twitch.tv';
const API_ENDPOINT = 'https://api.twitch.tv';
const durationRE = /(\d{1,2})h?(\d{1,2})m?(\d{1,2})s+/;

//TODO: sync clips as well

const syncVodTo = async (vod_id, timeoffset, channel, cb) => {
  const result = await getVodInfo(vod_id);
  let vodSynced = false;

  if (result?.data && result?.data.length > 0) {
    const vod = result.data[0];
    const created_at = vod.created_at;
    let vodCreatedTime = new Date(created_at);
    let vodRequestedTime = new Date(vodCreatedTime.getTime());
    vodRequestedTime.setSeconds(vodRequestedTime.getSeconds() + timeoffset);

    const channelVods = await getChannelVods(channel, vodRequestedTime);

    console.log(`[info] requested time: ${vodRequestedTime}`);
    console.log(
      `[info] found ${channelVods.data.length} for channel ${channel}`
    );

    //cycle through the channel vods until we find a vod that aired within the vodRequestedTime

    //TODO: paginate results
    channelVods.data.forEach((vodElement) => {
      let vodDuration = vodElement.duration;
      let matches = vodDuration.match(durationRE);
      let vodDurationSeconds =
        parseInt(matches[1]) * 3600 +
        parseInt(matches[2]) * 60 +
        parseInt(matches[3]);
      //console.log(`[info] looking at vod ${vodElement.url}...`);
      let vodBegin = new Date(vodElement.created_at);
      let vodEnd = new Date(vodBegin.getTime());
      vodEnd.setSeconds(vodEnd.getSeconds() + vodDurationSeconds);

      if (vodRequestedTime >= vodBegin && vodRequestedTime <= vodEnd) {
        let timeOffsetSeconds =
          (vodRequestedTime.getTime() - vodBegin.getTime()) / 1000;

        let resultTimeH = Math.floor(timeOffsetSeconds / 3600);
        let resultTimeM = Math.floor((timeOffsetSeconds % 3600) / 60);
        let resultTimeS =
          timeOffsetSeconds - resultTimeM * 60 - resultTimeH * 3600;
        let resultTimeStr = `${resultTimeH}h${resultTimeM}m${resultTimeS}s`;
        vodElement.url += '?t=' + resultTimeStr;
        vodSynced = vodElement;
      }
    });
  }
  console.log('returning vod ' + vodSynced.url);
  cb(vodSynced);
};

const getUserId = async (username) => {
  const user_info_res = await fetch(
    `${API_ENDPOINT}/helix/users?login=${username}`,
    {
      method: 'GET',
      headers: getAuthHeader(),
    }
  );
  const user_info = await user_info_res.json();
  const user_id = false;
  if (user_info?.data && user_info?.data.length > 0) {
    return user_info.data[0].id;
  } else {
    return;
  }
};

const getChannelVods = async (channel, timestamp) => {
  try {
    //Get user id by username
    const user_id = await getUserId(channel);
    const res = await fetch(`${API_ENDPOINT}/helix/videos?user_id=${user_id}`, {
      method: 'GET',
      headers: getAuthHeader(),
    });
    const channelVods = await res.json();
    return channelVods;
  } catch (e) {
    console.log(e);
  }
};

const getAuthHeader = () => {
  let auth = new Headers();
  auth.append('Client-Id', CLIENT_ID);
  auth.append('Authorization', 'Bearer 4yezsmpxsxrtbuyi758hb2ito97bfj');
  return auth;
};

const getVodInfo = async (id) => {
  try {
    const res = await fetch(`${API_ENDPOINT}/helix/videos?id=${id}`, {
      method: 'GET',
      headers: getAuthHeader(),
    });
    const vodInfo = await res.json();
    return vodInfo;
  } catch (e) {
    console.log(e);
  }
};

const getNewToken = async (cb) => {
  try {
    const res = await fetch(
      `${API_ENDPOINT_AUTH}/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`,
      {
        method: 'POST',
      }
    );
    const payload = await res.json();
    cb(payload);
  } catch (e) {
    cb();
  }
};

export { syncVodTo };
