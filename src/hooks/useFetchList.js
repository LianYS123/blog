import { isEmpty, uniqBy } from "lodash";
import { useEffect, useState } from "react";
import { useDeepCompareEffect } from "react-use";
import { useMutation } from "./useMutation";
import { useIsBottom } from "./useUtils";

/**
 * 无限滚动数据加载逻辑
 * @param {config.service} 请求方法
 * @param {config.necessaryParams} 必要参数
 */
export const useFetchList = ({ service, necessaryParams = {} }) => {
  const [list, setList] = useState([]); // 数据列表，页面上显示的所有数据
  const [loadingMore, setLoadingMore] = useState(false); // 正在加载更多数据
  const [loadData, { loading, data }] = useMutation(service);

  const isBottom = useIsBottom(); // 是否已经滚动到底部

  // 在数据列表中新增数据
  const addToList = rows => {
    const newList = uniqBy([...list, ...rows], it => it.id);
    setList(newList);
  };

  // 搜索功能
  const search = values => {
    return loadData({ ...necessaryParams, ...values });
  };

  // 加载更多数据
  const fetchMore = async () => {
    const { pageNo, totalPage } = data;
    const hasNextPage = pageNo < totalPage; // 是否存在下一页数据
    if (hasNextPage) {
      setLoadingMore(true);
      const result = await search({
        pageNo: pageNo + 1
      });
      const { rows } = result?.data || {};
      addToList(rows);
      setLoadingMore(false);
      return result;
    }
  };

  // 重新加载数据
  const reload = async () => {
    const result = await search({
      pageNo: 1
    });
    const { rows = [] } = result?.data || {};
    setList(rows);
  };

  // 滚动到底部时加载更多数据
  useEffect(() => {
    if (isBottom && !loading && !isEmpty(list)) {
      fetchMore();
    }
  }, [isBottom]);

  // 必要参数改变时重新加载数据
  useDeepCompareEffect(() => {
    reload();
  }, [necessaryParams]);

  return {
    list,
    fetchMore,
    isBottom,
    reload,
    loading,
    loadingMore,
    loadingFirstPage: loading && !list.length
  };
};
