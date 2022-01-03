import { useRequest } from "hooks";
import { uniqBy } from "lodash";
import { useEffect, useRef, useState } from "react";
import {
  useDeepCompareEffect,
  useWindowScroll,
  useWindowSize
} from "react-use";

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

export const useFetchList = ({ service, necessaryParams = {}, ...rest }) => {
  const [list, setList] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const autoSetRef = useRef(true); // 自动合并搜索列表到list中
  useDeepCompareEffect(() => {
    autoSetRef.current = false;
  }, [necessaryParams]);
  const requestResult = useRequest({
    service,
    necessaryParams: {
      pageNo: 1,
      pageSize: 10,
      ...necessaryParams
    },
    onSuccess: (newData, oldData) => {
      if (autoSetRef.current) {
        const newList = uniqBy([...list, ...newData.rows], it => it.id);
        setList(newList);
      } else {
        // autoSetRef.current = true;
        setList(newData.rows);
      }
    },
    ...rest
  });
  const { loading, reload, data, params, search } = requestResult;
  const isBottom = useIsBottom();
  const hasNextPage = data.pageNo < data.totalPage;
  const nextPage = data.pageNo + 1;
  const fetchMore = async () => {
    setLoadingMore(true);
    await search({
      ...params,
      pageNo: nextPage
    });
    setLoadingMore(false);
  };
  useEffect(() => {
    if (isBottom && !loading && hasNextPage) {
      fetchMore();
    }
  }, [isBottom]);
  const refresh = async () => {
    await search({
      ...params,
      pageNo: 1
    });
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
