import React, { useState } from "react";
import { useFetchList } from "hooks";
import { ARTICLE_LIST } from "services/article";
import { SkeletonList } from "components/skeleton";
import { useLocation } from "react-router-dom";
import { parse, stringify } from "query-string";
import routers from "routers";
import { useHistory } from "react-router-dom";
import { Box, Chip, Container, Stack, TextField } from "@mui/material";
import { Empty } from "components/empty";
import { TagFilter } from "./TagFilter";
import CardArticle from "./card/CardArticle";

const ArticleList = () => {
  const { search: searchStr } = useLocation();
  const { keyword } = parse(searchStr);
  // const [keyword, setKeyword] = useState(initialKeyword);
  const [selectedTags, setSelectedTags] = useState([]);
  const history = useHistory();

  const {
    list = [],
    loadingFirstPage,
    loadingMore,
    loading,
    search
  } = useFetchList({
    service: ARTICLE_LIST,
    necessaryParams: { tags: selectedTags, keyword }
  });

  const handleTagClose = tag => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handleTagClick = tag => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      setSelectedTags(selectedTags.filter(it => it !== tag));
    }
  };

  // 搜索
  const handleSearch = (kw = keyword) => {
    history.push({
      pathname: routers.ARTICLE_LIST,
      search: stringify({ keyword: kw })
    });
  };

  return (
    <Container className="pt-4 md:pt-10 pb-6">
      <div className="mb-8 flex justify-between">
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

      <TagFilter
        handleTagClick={handleTagClick}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />

      <SkeletonList loading={loadingFirstPage} />
      {list.length ? (
        <Stack spacing={2}>
          {list.map(it => {
            return (
              <CardArticle
                handleTagClick={tag => handleTagClick(tag)}
                key={it.id}
                {...it}
              />
            );
          })}
        </Stack>
      ) : loading ? null : (
        <Empty />
      )}

      <SkeletonList loading={loadingMore} />
    </Container>
  );
};

export default ArticleList;
