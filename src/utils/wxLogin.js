import { WX_LOGIN_API } from '../common/conf.js';
import base64 from './base64';

export default ()=> {
  var href = window.location.href.replace(/&from=(timeline|groupmessage|singlemessage)/,'');
      href = href.replace(/&isappinstalled=\d/,'');
      window.location.href = WX_LOGIN_API + base64.encode(href);
}