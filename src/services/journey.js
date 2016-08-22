import {get, post} from '../common/ajax'; 

/**
 * 获取玩法列表
 * @param  {Object} context 上下文
 * @param  {Object} params 查询条件
 * @return {Promise} Promise
 */
export const getJourneyList = (context, params) => {
  const url = '/journey/search';
  return post(context, url, params)
    .then((json) => {
      if (json.returnCode == 0) {
        return json.data;
      }
      return Promise.reject(new Error('getJourneyList failure'));
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
