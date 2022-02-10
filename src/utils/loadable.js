import L from "react-loadable";
import Loading from "components/loading";

// 动态加载页面
const loadable = url => {
  return L({
    loading: Loading,
    loader: () => import(`pages/${url}/index.jsx`)
  });
};

export default loadable;
