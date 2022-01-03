import React, { useState } from "react";
import { useFetchList } from "hooks";
import { Article } from "./Article";
import { ARTICLE_LIST } from "services/article";
import { SkeletonList } from "components/skeleton";
import { Tag } from "@douyinfe/semi-ui";

const ArticleList = () => {
  const [tags, setTags] = useState([]);
  const handleTagClick = tag => {
    if (tags.every(t => t.tagName !== tag.tagName)) {
      setTags([...tags, tag]);
    }
  };
  const {
    list = [],
    loadingFirstPage,
    loadingMore
  } = useFetchList({
    service: ARTICLE_LIST,
    necessaryParams: { tags: tags.map(it => it.tagName) }
  });

  const handleTagClose = tag => {
    setTags(tags.filter(it => it.tagName !== tag.tagName));
  };

  return (
    <div className="py-4 md:pb-16 container">
      <div className="mb-2">
        {tags.length
          ? tags.map(it => (
              <Tag
                className="mr-1"
                closable
                onClose={() => handleTagClose(it)}
                key={it.tagName}
                color={it.tagColor || "white"}
              >
                {it.tagName}
              </Tag>
            ))
          : null}
      </div>
      <div className="space-y-3 mb-4">
        <SkeletonList loading={loadingFirstPage} />
        {list.map(it => (
          <Article handleTagClick={handleTagClick} key={it.id} {...it} />
        ))}
        <SkeletonList loading={loadingMore} />
      </div>
    </div>
  );
};
export default ArticleList;
