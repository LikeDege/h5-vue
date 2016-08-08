import {get, post} from '../common/ajax'; 

/**
 * 获取首页数据
 * @param  {String} type  首页数据类型
 * @return {Promise}      Promise
 */
export const getHomePage = (context, type = 2) => {
  const url = '/search/h5/hotList';
  const params = { id: type };
  return post(context, url, params)
    .then((json) => {
      if (json.returnCode == 0) {
        return json.data;
      }
      return Promise.reject(new Error('fetchHomePage failure'));
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};