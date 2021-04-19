import { syncVodTo } from '../../../lib';

const vodSync = (req, res) => {
  if (req.method === 'POST') {
    const { id } = req.query;
    const { timestamp, channel } = req.body;

    return syncVodTo(id, timestamp, channel, (vodinfo) => {
      // console.log(vodinfo);

      //TODO: better error messages (vod not found, incorrect url format...)
      if (vodinfo && vodinfo?.url) {
        res.status(200).json({ vodinfo });
      } else {
        res.status(400).json({ message: 'Unkown error occurred' });
      }
    });
  }
};

export default vodSync;
