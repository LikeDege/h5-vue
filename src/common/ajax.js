import "es6-promise/auto";
import axios from "axios";
import {API} from "./conf";
import Toast from "../components/common/toast";

const error = (msg)=>{
  // 错误提示
  Toast({
    message: msg,
    position: 'center',
    duration: 5000
  });
}

export async function get(path) {
    let result = await axios.get(path);
    return result.data;
}

export default async function post(url,params,otherPath) {
    try {
      let result = await axios.request({
          url: url,
          method: 'post',
          data: params,
          withCredentials: true,
          baseURL: API,
      });
      if(result.data.returnCode != 0) {
        error(result.data.returnMsg);
      }
      return result.data;
    } catch (e){
      error('糟糕,服务器出错了~~');
      return '';
    }
}