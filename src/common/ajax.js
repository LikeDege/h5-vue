import { API as api  } from './conf';

/**
 * get请求
 * @param  {Object} context       上下文
 * @param  {String} options.url   api地址
 * @param  {String} options.query query参数
 * @return {Promise}               Promise
 */
export const get = (context, url, query) => {
  let _url;
  if (query) {
    _url = `${api}${url}?${query}`;
  } else {
    _url = `${api}${url}`;
  }

  return context.$http.get(_url, {credentials: true, emulateJSON: false})
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      }
      return Promise.reject(new Error(res.status));
    });
};

/**
 * post请求
 * @param  {Object} context 上下文
 * @param  {String} url     api地址
 * @param  {Object} params  包含post内容的object
 * @return {Promise}        Promise
 */
export const post = (context, url, params) => {
  return context.$http.post(`${api}${url}`, params, {credentials: true, emulateJSON: false})
  .then((res) => {
    if (res.status >= 200 && res.status < 300) {
      return res.json();
    }
    return Promise.reject(new Error(res.status));
  });
};