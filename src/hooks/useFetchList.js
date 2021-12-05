import { useRequest } from "hooks";
import { uniqBy } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useWindowScroll, useWindowSize } from "react-use";

function getDocHeight() {
  var D = document;
  return Math.max(
    D.body.scrollHeight,
    D.documentElement.scrollHeight,
    D.body.offsetHeight,
    D.documentElement.offsetHeight,
    D.body.clientHeight,
    D.documentElement.clientHeight
  );
}

const useIsBottom = (dis = 0) => {
  const { y } = useWindowScroll();
  const { height } = useWindowSize();
  return y + height + dis >= getDocHeight();
};

export const useFetchList = ({ service, ...rest }) => {
  const [list, setList] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const autoSetRef = useRef(true); // 自动合并搜索列表到list中
  const requestResult = useRequest({
    service,
    necessaryParams: { pageSize: 10 },
    onSuccess: (newData, oldData) => {
      if (autoSetRef.current) {
        const newList = uniqBy([...list, ...newData.list], it => it.id);
        setList(newList);
      } else {
        autoSetRef.current = true;
      }
    },
    ...rest
  });
  const { loading, reload, data, params, search } = requestResult;
  const isBottom = useIsBottom();
  const fetchMore = async () => {
    setLoadingMore(true);
    await search({
      ...params,
      page: data.nextPage
    });
    setLoadingMore(false);
  };
  useEffect(() => {
    if (isBottom && !loading && data.hasNextPage) {
      fetchMore();
    }
  }, [isBottom]);
  const refresh = async () => {
    const { data } = await search({
      ...params,
      page: 1
    });
    autoSetRef.current = false;
    setList(data.list);
  };
  return {
    ...requestResult,
    list,
    fetchMore,
    isBottom,
    refresh,
    loadingMore,
    loadingFirstPage: loading && !list.length
  };
};
