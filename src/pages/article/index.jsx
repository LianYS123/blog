import React, { useState } from "react";
import { useFetchList } from "hooks";
import { ARTICLE_LIST } from "services/article";
import { SkeletonList } from "components/skeleton";
import { useLocation } from "react-router-dom";
import { parse, stringify } from "query-string";
import routers from "routers";
import { useHistory } from "react-router-dom";
import { Box, Chip, Container, Stack, TextField } from "@mui/material";
import CardArticle from "./CardArticle";
import { Empty } from "components/empty";

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
    loading,
    search
  } = useFetchList({
    service: ARTICLE_LIST,
    necessaryParams: { tags, keyword }
  });

  const handleTagClose = tag => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleTagClick = tag => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
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
    <Container className="pt-2 md:pt-6 pb-6">
      <div className="mb-4 flex justify-between">
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
      <Box sx={{ mb: 1 }}>
        {tags?.length ? (
          <div className="flex space-x-1">
            {tags.map(tag => (
              <Chip
                className="m-1"
                onDelete={() => handleTagClose(tag)}
                key={tag}
                label={tag}
              />
            ))}
          </div>
        ) : (
          []
        )}
      </Box>

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
