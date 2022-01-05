import React, { useState } from "react";
import { useFetchList } from "hooks";
import { Article } from "./Article";
import { ARTICLE_LIST } from "services/article";
import { SkeletonList } from "components/skeleton";
import { Input, Tag } from "@douyinfe/semi-ui";
import { useLocation } from "react-router-dom";
import { parse, stringify } from "query-string";
import routers from "routers";
import { useHistory } from "react-router-dom";
import { IconSearch } from "@douyinfe/semi-icons";

const ArticleList = () => {
  const { search: searchStr } = useLocation();
  const { keyword } = parse(searchStr);
  // const [keyword, setKeyword] = useState(initialKeyword);
  const [tags, setTags] = useState([]);
  const history = useHistory();

  // 标签过滤
  const handleTagClick = tag => {
    if (tags.every(t => t.tagName !== tag.tagName)) {
      setTags([...tags, tag]);
    }
  };
  const {
    list = [],
    loadingFirstPage,
    loadingMore,
    search
  } = useFetchList({
    service: ARTICLE_LIST,
    necessaryParams: { tags: tags.map(it => it.tagName), keyword }
  });

  const handleTagClose = tag => {
    setTags(tags.filter(it => it.tagName !== tag.tagName));
  };

  // 搜索
  const handleSearch = (kw = keyword) => {
    history.push({
      pathname: routers.ARTICLE_LIST,
      search: stringify({ keyword: kw })
    });
  };

  return (
    <div className="py-4 md:pb-16 container">
      <div className="mb-2 flex justify-between">
        <div>
          {keyword ? (
            <Tag className="mr-1" closable onClose={() => handleSearch("")}>
              {keyword}
            </Tag>
          ) : null}
        </div>
        <div>
          <Input
            prefix={<IconSearch />}
            placeholder="输入关键词搜索"
            onEnterPress={ev => handleSearch(ev.target.value)}
          />
        </div>
      </div>
      {tags && tags.length ? (
        <div className="mb-2 flex items-center">
          <span className="text-sm font-light mr-2">标签:</span>
          <div className="flex">
            {tags.map(it => (
              <Tag
                className="mr-1"
                closable
                onClose={() => handleTagClose(it)}
                key={it.tagName}
                color={it.tagColor || "white"}
              >
                {it.tagName}
              </Tag>
            ))}
          </div>
        </div>
      ) : (
        []
      )}

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
