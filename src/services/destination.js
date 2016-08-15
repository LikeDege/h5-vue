import {get, post} from '../common/ajax'; 

/**
 * 获取城市列表
 * @param  {Object} context 上下文
 * @param  {Object} params  查询条件
 * @return {Promise}      Promise
 */
export const getCityList = (context, params) => {
  const url = '/addr/cityList';
  return post(context, url, params)
    .then((json) => {
      if (json.returnCode == 0) {
        return json.data;
      }
      return Promise.reject(new Error('getCityList failure'));
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
