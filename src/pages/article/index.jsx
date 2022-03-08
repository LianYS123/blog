import React from "react";
import { useFetchList, useHistoryState } from "hooks";
import { ARTICLE_LIST } from "services/article";
import { SkeletonList } from "components/skeleton";
import { Container, Stack, TextField } from "@mui/material";
import { Empty } from "components/empty";
import { TagFilter } from "./TagFilter";
import CardArticle from "./card/CardArticle";

const ArticleList = () => {
  const { state, setState } = useHistoryState();

  const { selectedTags = [], keyword } = state;

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

  const handleTagClick = tag => {
    // 如果标签已选中，则取消选中，否则选中该标签
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(it => it !== tag)
      : [...selectedTags, tag];
    setState({ selectedTags: newTags });
  };

  // 搜索
  const handleSearch = (kw = keyword) => {
    setState({ keyword: kw });
  };

  return (
    <Container>
      <TagFilter handleTagClick={handleTagClick} />

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
