const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const VOD_SEARCH_RANGE = 20;
const API_ENDPOINT_AUTH = 'https://id.twitch.tv';
const API_ENDPOINT = 'https://api.twitch.tv';
const durationRE = /(\d{1,2})h?(\d{1,2})m?(\d{1,2})s+/;
let currentSessionToken = false;
const syncVodTo = async (vod_id, timeoffset, channel, cb) => {
  const result = await getVodInfo(vod_id);
  let vodResult = false;
  let error = false;
  if (result) {
    const vod = result.data[0];
    const created_at = vod.created_at;
    let vodCreatedTime = new Date(created_at);
    let vodRequestedTime = new Date(vodCreatedTime.getTime());
    vodRequestedTime.setSeconds(vodRequestedTime.getSeconds() + timeoffset);

    [vodResult, error] = await getVodAtTime(channel, vodRequestedTime);
    cb(vodResult, error);
  } else {
    cb(false, 'ERR_GET_VOD');
  }
};

/**
 *
 * @param {string} channel the channel name
 * @param {Date} vodRequestedTime the date and time of the sourced clip
 * @returns {[boolean, string]} an array containing an object of the VOD result if found, and the error if any
 */
const getVodAtTime = async (channel, vodRequestedTime) => {
  let vodResultsLimit = 400;
  let vodsChecked = 0;
  let pagination = '';
  while (vodsChecked < vodResultsLimit) {
    let channelVodsRes = await getChannelVods(channel, pagination);
    if (channelVodsRes == 'ERR_CHANNEL_INVALID') {
      return [false, 'ERR_CHANNEL_INVALID'];
    }
    if (!channelVodsRes.data || channelVodsRes?.data?.length == 0)
      return [false, 'ERR_CHANNEL_NO_VODS'];

    //cycle through the channel vods until we find a vod that aired within the vodRequestedTime
    for (let i = 0; i < channelVodsRes.data.length; i++) {
      let vodElement = channelVodsRes.data[i];
      let vodDuration = vodElement.duration;
      let matches = vodDuration.match(durationRE);
      let vodDurationSeconds =
        parseInt(matches[1] || 0) * 3600 +
        parseInt(matches[2] || 0) * 60 +
        parseInt(matches[3] || 0);
      //console.log(`[info] looking at vod ${vodElement.url}...`);
      let vodBegin = new Date(vodElement.created_at);
      let vodEnd = new Date(vodBegin.getTime());
      vodEnd.setSeconds(vodEnd.getSeconds() + vodDurationSeconds);

      //Found a vod that starts before the vodRequestedTime and ends after the vodRequestedTime
      if (vodRequestedTime >= vodBegin && vodRequestedTime <= vodEnd) {
        let timeOffsetSeconds =
          (vodRequestedTime.getTime() - vodBegin.getTime()) / 1000;

        let resultTimeH = Math.floor(timeOffsetSeconds / 3600);
        let resultTimeM = Math.floor((timeOffsetSeconds % 3600) / 60);
        let resultTimeS =
          timeOffsetSeconds - resultTimeM * 60 - resultTimeH * 3600;
        let resultTimeStr = `${resultTimeH}h${resultTimeM}m${resultTimeS}s`;
        vodElement.url += '?t=' + resultTimeStr;
        console.log(`[info] found vod ${vodElement.url}`);
        return [vodElement, false];
      }
    }
    vodsChecked += channelVodsRes.data.length;
    console.log(`[info] channel: ${channel} - vods checked: ${vodsChecked}`);
    pagination = channelVodsRes?.pagination?.cursor;
  }
  return [false, 'ERR_VOD_NOT_FOUND'];
};

const getUserId = async (username) => {
  const user_info_res = await fetch(
    `${API_ENDPOINT}/helix/users?login=${username}`,
    {
      method: 'GET',
      headers: await getAuthHeader(),
    }
  );
  const user_info = await user_info_res.json();
  if (user_info?.data && user_info?.data.length > 0) {
    return user_info.data[0].id;
  } else {
    return;
  }
};

const getChannelVods = async (channel, pagination = false) => {
  try {
    //Get user id by username
    const user_id = await getUserId(channel);
    if (!user_id) return 'ERR_CHANNEL_INVALID';

    const res = await fetch(
      `${API_ENDPOINT}/helix/videos?user_id=${user_id}&first=${VOD_SEARCH_RANGE}` +
        (pagination ? `&after=${pagination}` : ''),
      {
        method: 'GET',
        headers: await getAuthHeader(),
      }
    );
    const channelVods = await res.json();
    return channelVods;
  } catch (e) {
    console.log(e);
  }
};

const getAuthHeader = async () => {
  let auth = new Headers();
  auth.append('Client-Id', CLIENT_ID);
  if (!currentSessionToken) {
    const tokenRes = await getNewToken();
    currentSessionToken = tokenRes.access_token;
  }
  auth.append('Authorization', 'Bearer ' + currentSessionToken);
  return auth;
};

const getVodInfo = async (id) => {
  try {
    const res = await fetch(`${API_ENDPOINT}/helix/videos?id=${id}`, {
      method: 'GET',
      headers: await getAuthHeader(),
    });
    const vodInfo = await res.json();
    console.log(vodInfo);
    if (vodInfo?.data && vodInfo?.data.length > 0) {
      return vodInfo;
    }
    return false;
  } catch (e) {
    console.log(e);
  }
};

const getNewToken = async () => {
  try {
    const res = await fetch(
      `${API_ENDPOINT_AUTH}/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`,
      {
        method: 'POST',
      }
    );
    const payload = await res.json();
    return payload;
  } catch (e) {
    console.error(e);
  }
};

export { syncVodTo };
