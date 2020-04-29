import { smsHost } from './../config/config.service';
import axios from 'axios';

export default axios.create({
  baseURL: smsHost,
  //   headers: {
  //     Authorization:
  //       'Bearer tQEzt2Ubbx6LmiM4iefLEz9hKypTk-6KOWSMMOvXpqcA8TnhMeyBNBkLpi9O62WpUfdzlh0PqZQ0XTC0mpXdtuTmSrFtquGnG2q2YpvImlfRcfh2yz3w-wsp2ckQXnYx',
  //   },
});
