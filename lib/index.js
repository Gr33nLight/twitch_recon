const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_ENDPOINT_AUTH = 'https://id.twitch.tv';
const API_ENDPOINT = 'https://api.twitch.tv';
// const durationRE = new RegExp(`(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)`);
const durationRE = new RegExp(`(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?`);

const syncVodTo = async (vod_id, timeoffset, channel, cb) => {
  const result = await getVodInfo(vod_id);
  if (result?.data && result?.data.length > 0) {
    const vod = result.data[0];
    const created_at = vod.created_at;
    let vodCreatedTime = new Date(created_at);
    let vodRequestedTime = new Date(vodCreatedTime.getTime());
    vodRequestedTime.setSeconds(vodRequestedTime.getSeconds() + timeoffset);

    const channel_vods = await getChannelVods(channel, vodRequestedTime);

    channel_vods.data.forEach((vod_element) => {
      let vod_duration = vod_element.duration;
      let vod_start = vod_element.created_at;
      let matches = vod_duration.match(durationRE);
      console.log(vod_duration);
      console.log(matches);
      let vod_ending = vod_element.created_at;
    });
  }
  cb(result);
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
    const res = await fetch(
      `${API_ENDPOINT}/helix/videos?user_id=${user_id}&first=2`,
      {
        method: 'GET',
        headers: getAuthHeader(),
      }
    );
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
