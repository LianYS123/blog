import { isEmpty, uniqBy } from "lodash";
// import { useGlobalProgress } from "providers/ProgressProvider";
import { useCallback, useMemo } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { useFetch } from "./useFetch";

/**
 * 无限滚动数据加载逻辑
 * @param {config.service} 请求方法
 * @param {config.necessaryParams} 必要参数
 */
export const useFetchList = ({
  service,
  params,
  deps = [],
  ready = true,
  ...config
}) => {
  const queryClient = useQueryClient();

  const fetch = useFetch(service, config);

  const queryFn = async ({ pageParam = 1 }) => {
    const { data } = await fetch({ ...params, pageNo: pageParam }, config);
    return data;
  };
  const queryKey = [service, params, ...deps];

  const res = useInfiniteQuery(queryKey, queryFn, {
    // queryFn,
    // queryKey,
    enabled: ready,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) {
        return;
      }
      const { pageNo, totalPage } = lastPage;
      const hasNextPage = pageNo < totalPage; // 是否存在下一页数据
      if (hasNextPage) {
        return pageNo + 1;
      }
    },
    getPreviousPageParam: (firstPage, allPages) => {
      if (!firstPage) {
        return;
      }
      const { pageNo, totalPage } = firstPage;
      if (pageNo > 1) {
        return pageNo - 1;
      }
    },
    ...config
  });

  const { data, isLoading, isFetching, fetchNextPage, refetch } = res;

  const setPages = pages => {
    queryClient.setQueriesData(queryKey, data => ({
      pages,
      pageParams: data.pageParams
    }));
  };

  // 根据id删除
  const removeItemById = id => {
    const newPagesArray =
      data.pages.map(page => {
        const { rows = [] } = page;
        const newRows = rows.filter(val => val.id !== id);
        return {
          ...page,
          rows: newRows
        };
      }) ?? [];
    setPages(newPagesArray);
  };

  // 编辑指定项
  const editItem = item => {
    const newPagesArray =
      data.pages.map(page => {
        const { rows = [] } = page;
        const newRows = rows.map(cur => (cur.id === item.id ? item : cur));
        return {
          ...page,
          rows: newRows
        };
      }) ?? [];
    setPages(newPagesArray);
  };

  // 提取所有分页数据
  const list = useMemo(() => {
    if (data && data.pages) {
      const list = data.pages
        .filter(it => !!it)
        .map(it => it.rows)
        .flat();
      return uniqBy(list, it => it.id);
    } else {
      return [];
    }
  }, [data]);

  const fetchMore = useCallback(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  }, [isFetching]);

  // 滚动到底部时加载更多数据
  const scrollRef = useBottomScrollListener(fetchMore, {
    offset: 50,
    debounce: 1000
    // triggerOnNoScroll: true // 自动触发一次
  });

  // 全局加载进度条
  // useGlobalProgress(isLoading);

  return {
    list,
    removeItemById,
    editItem,
    scrollRef,
    loadingFirstPage: isLoading && isEmpty(list),
    reload: refetch,
    total: data?.pages?.[0]?.totalRows || 0,
    ...res
  };
};
