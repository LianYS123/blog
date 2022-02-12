import React, { useState } from "react";
import { useFetchList } from "hooks";
import { Article } from "./Article";
import { ARTICLE_LIST } from "services/article";
import { SkeletonList } from "components/skeleton";
import { useLocation } from "react-router-dom";
import { parse, stringify } from "query-string";
import routers from "routers";
import { useHistory } from "react-router-dom";
import { Chip, TextField } from "@mui/material";

const ArticleList = () => {
  const { search: searchStr } = useLocation();
  const { keyword } = parse(searchStr);
  // const [keyword, setKeyword] = useState(initialKeyword);
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const {
    list = [],
    loadingFirstPage,
    loadingMore,
    search
  } = useFetchList({
    service: ARTICLE_LIST,
    necessaryParams: { tags, keyword }
  });

  const handleTagClose = tag => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleTagClick = tag => {
    setTags([...tags, tag]);
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
            <React.Fragment>
              <span className="text-sm font-light mr-2">搜索:</span>
              <span className="text-sm">{keyword}</span>
            </React.Fragment>
          ) : null}
        </div>
        <div>
          <TextField
            label="搜索"
            variant="standard"
            size="small"
            placeholder="输入关键词搜索"
            onKeyPress={ev => {
              if (ev.key.toUpperCase() === "ENTER") {
                handleSearch(ev.target.value);
              }
            }}
          />
        </div>
      </div>
      {tags?.length ? (
        <div className="mb-2 flex items-center">
          <span className="text-sm font-light mr-2">标签:</span>
          <div className="flex">
            {tags.map(tag => (
              <Chip
                size="small"
                className="mr-1"
                onDelete={() => handleTagClose(tag)}
                key={tag}
                label={tag}
              />
            ))}
          </div>
        </div>
      ) : (
        []
      )}

      <div className="space-y-3 mb-4">
        <SkeletonList loading={loadingFirstPage} />
        {list.map(it => (
          <Article
            handleTagClick={tag => handleTagClick(tag)}
            key={it.id}
            {...it}
          />
        ))}
        <SkeletonList loading={loadingMore} />
      </div>
    </div>
  );
};
export default ArticleList;
