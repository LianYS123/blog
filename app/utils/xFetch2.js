import xFetch from './xFetch';
import qs from 'querystring';

export const get = (url, params, opt) =>
  xFetch(`${url}?${qs.stringify(params)}`, opt);
export const post = (url, body, opt) =>
  xFetch(url, {
    ...opt,
    body,
    method: 'POST'
  });
export const put = (url, body, opt) =>
  xFetch(url, {
    ...opt,
    body,
    method: 'PUT'
  });
export const del = (url, body, opt) =>
  xFetch(url, {
    ...opt,
    body,
    method: 'DELETE'
  });