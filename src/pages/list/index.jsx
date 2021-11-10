import React from "react";
import { useTable } from "hooks";
import { ARTICLE_LIST } from "services/API";
import { Pagination, Skeleton } from "@douyinfe/semi-ui";
import { Article } from "./Article";

const ArticleList = () => {
  const { tableProps, loading } = useTable({
    service: ARTICLE_LIST
  });
  const { dataSource, pagination } = tableProps;
  const placeholder = (
    <section className="shadow-sm px-4 py-3 flex rounded">
      <div className="flex w-full flex-col justify-between">
        <div className="space-y-1">
          <Skeleton.Title className="font-bold w-48"></Skeleton.Title>
          <div className="flex h-16 md:h-24">
            <Skeleton.Paragraph className="flex-auto h-full mr-1 md:mr-4"></Skeleton.Paragraph>
            <Skeleton.Image className="h-full w-24 flex-shrink-0 md:w-40" />
          </div>
        </div>
        <div className="space-x-2 flex">
          <Skeleton.Button />
          <Skeleton.Button />
        </div>
      </div>
    </section>
  );
  return (
    <div className="mb-16 container">
      <div className="space-y-3 mb-4">
        {dataSource.length ? (
          dataSource.map(it => (
            <Skeleton
              active
              key={it.id}
              loading={loading}
              placeholder={placeholder}
            >
              <Article {...it} />
            </Skeleton>
          ))
        ) : (
          <Skeleton active loading={loading} placeholder={placeholder}>
            loading...
          </Skeleton>
        )}
      </div>
      <Pagination {...pagination} />
    </div>
  );
};
export default ArticleList;
