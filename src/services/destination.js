import {get, post} from '../common/ajax'; 

/**
 * 获取城市列表
 * @param  {Object} context 上下文
 * @param  {Object} params 查询条件
 * @return {Promise} Promise
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

/**
 * 获取存在玩法的目的地
 * @param  {Object} context 上下文
 * @param  {Number} journeyType  玩法类型
 * @return {Promise} Promise
 */
export const getDestinationList = (context, journeyType) => {
  const url = '/home/h5/getCountryAndCityData';
  const params = {journeyType: journeyType}
  return post(context, url, params)
    .then((json) => {
      if (json.returnCode == 0) {
        return json.data;
      }
      return Promise.reject(new Error('getCountryCityList failure'));
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
