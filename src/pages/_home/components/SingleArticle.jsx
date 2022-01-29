import React from "react";
import { useRequest } from "hooks";
import { Spin } from "@douyinfe/semi-ui";
import { GET_ARTICLE_DETAIL } from "services/article";

export const SingleArticle = ({ articleId }) => {
  const { data, loading } = useRequest({
    service: GET_ARTICLE_DETAIL,
    necessaryParams: { id: articleId },
    ready: !!articleId,
    initialData: { html: "" }
  });
  const { html, articleName } = data;
  return (
    <div className="h-full px-8 sm:px-16" id="htmlTemplate">
      {/* <h1>{articleName}</h1> */}
      <Spin spinning={loading}>
        <article dangerouslySetInnerHTML={{ __html: html }}></article>
      </Spin>
    </div>
  );
};
