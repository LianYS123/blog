import React from "react";
import { useTable } from "hooks";
import { Pagination, Skeleton } from "@douyinfe/semi-ui";
import { Article } from "./Article";
import { ARTICLE_LIST } from "services/article";
import { ArticlePlaceholder } from "components/skeleton";

const ArticleList = () => {
  const { tableProps, loading } = useTable({
    service: ARTICLE_LIST
  });
  const { dataSource, pagination } = tableProps;
  return (
    <div className="mb-16 container">
      <div className="space-y-3 mb-4">
        {dataSource.length ? (
          dataSource.map(it => (
            <Skeleton
              active
              key={it.id}
              loading={loading}
              placeholder={<ArticlePlaceholder />}
            >
              <Article {...it} />
            </Skeleton>
          ))
        ) : (
          <Skeleton
            active
            loading={loading}
            placeholder={<ArticlePlaceholder />}
          >
            loading...
          </Skeleton>
        )}
      </div>
      <Pagination {...pagination} />
    </div>
  );
};
export default ArticleList;
