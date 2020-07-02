import { notification } from 'antd';

const parseMessage = (res, msg) =>
  typeof res === 'string'
    ? res
    : res.resultMessage || res.message || msg || '请求错误';

const errorHandler = (error) => {
  const message = parseMessage(error);
  notification.error({ message });
  console.log(message);
  return Promise.reject(message);
};

const check401 = (res) => {
  if (res.status === 401) {
    localStorage.removeItem('token');
    const message = parseMessage(res, '认证错误');
    return Promise.reject(message);
  }
  return res;
};
const parseResultObject = ({ ok, resultObject }) => {
  if (ok) {
    return resultObject;
  } else {
    const message = parseMessage(res);
    return Promise.reject(message);
  }
};
const xFetch = (url, opt = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    ...opt.headers,
    'access-token': `Bearer ${token}`,
    Authorization: token
  };
  return fetch(url, { ...opt, headers })
    .then((res) => res.json())
    .then(check401)
    .then(parseResultObject)
    .catch(errorHandler);
};
export default xFetch;
