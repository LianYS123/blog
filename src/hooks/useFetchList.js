import { isEmpty, uniqBy } from "lodash";
import { useEffect, useState } from "react";
import { useDeepCompareEffect } from "react-use";
import { useMutation } from "./useMutation";
import useSpinDelay, { useIsBottom } from "./useUtils";

/**
 * 无限滚动数据加载逻辑
 * @param {config.service} 请求方法
 * @param {config.necessaryParams} 必要参数
 */
export const useFetchList = ({
  service,
  necessaryParams = {},
  ready = true
}) => {
  const [list, setList] = useState([]); // 数据列表，页面上显示的所有数据
  const [loadingMore, setLoadingMore] = useState(false); // 正在加载更多数据
  const [loadData, { loading, loadingDelay, data }] = useMutation(service);

  const loadingMoreDelay = useSpinDelay(loadingMore, { delay: 500 }); // loading 状态延迟显示

  const isBottom = useIsBottom(); // 是否已经滚动到底部

  // 在数据列表中新增数据
  const addToList = rows => {
    const newList = uniqBy([...list, ...rows], it => it.id);
    setList(newList);
  };

  // 每次请求带上必要参数
  const request = values => {
    if (ready) {
      return loadData({ ...necessaryParams, ...values });
    }
  };

  // 加载更多数据
  const fetchMore = async () => {
    if (!ready) return;
    const { pageNo, totalPage } = data;
    const hasNextPage = pageNo < totalPage; // 是否存在下一页数据
    if (hasNextPage) {
      setLoadingMore(true);
      const result = await request({
        pageNo: pageNo + 1
      });
      const { rows } = result?.data || {};
      addToList(rows);
      setLoadingMore(false);
      return result;
    }
  };

  // 根据id删除
  const removeItemById = id => {
    setList(list => list.filter(it => it.id !== id));
  };

  // 编辑指定项
  const editItem = item => {
    const newList = list.map(cur => (cur.id === item.id ? item : cur));
    setList(newList);
  };

  // 搜索
  const search = async (values = {}) => {
    if (!ready) {
      return;
    }
    const result = await request({
      pageNo: 1,
      ...values
    });
    const { rows = [] } = result?.data || {};
    setList(rows);
  };

  // 重新加载数据
  const reload = async () => {
    search();
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
    search,
    isBottom,
    reload,
    loading,
    loadingDelay,
    loadingMore,
    loadingMoreDelay,
    loadingFirstPage: loading && !list.length,
    removeItemById,
    editItem
  };
};
