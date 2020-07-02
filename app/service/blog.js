import { get, post, put, del } from 'utils/xFetch2';

const baseUrl = `/api/blog`;

//列表
export const listBlog = ({ page, pageSize }) =>
  get(baseUrl, { page, pageSize });
//增
export const addBlog = ({ title, content }) =>
  post(baseUrl, { title, content });
//删
export const deleteBlog = ({ id }) => del(`${baseUrl}/${id}`);
//改
export const editBlog = ({ title, content }) =>
  put(`${baseUrl}/${id}`, { title, content });
//查
export const getBlog = ({ id }) => get(baseUrl, { id });
