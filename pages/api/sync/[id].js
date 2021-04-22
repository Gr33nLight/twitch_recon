import { syncVodTo } from '../../../lib';
import { ERR_UNKNOWN } from '../../../lib/error_codes';

const vodSync = (req, res) => {
  if (req.method === 'POST') {
    const { id } = req.query;
    const { timestamp, channel } = req.body;

    return syncVodTo(id, timestamp, channel, (vodinfo, error) => {
      if (error) {
        res.status(200).json({ success: false, err_code: error });
      } else if (vodinfo && vodinfo?.url) {
        res.status(200).json({ success: true, vodinfo });
      } else {
        res.status(400).json({ success: false, err_code: ERR_UNKNOWN });
      }
    });
  }
};

export default vodSync;
