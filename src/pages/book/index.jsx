import React, { useEffect, useState } from "react";
import { useHistoryState, useRequest } from "hooks";
import { SkeletonList } from "components/skeleton";
import { Box, Container, Pagination, Stack, TextField } from "@mui/material";
import { Empty } from "components/empty";
import { BookFilter } from "./Filter";
import BookItem from "./BookItem";
import { BOOK_PAGE } from "services/book";
import { isEmpty } from "lodash";

const Book = () => {
  const { state, setState } = useHistoryState();

  const {
    selectedTags = [],
    keyword,
    order = "rating_count",
    category = "ALL",
    pageNo = 1
  } = state;

  const {
    data = {},
    isLoading,
    refetch
  } = useRequest({
    service: BOOK_PAGE,
    params: {
      tags: selectedTags.join(","),
      searchValue: keyword,
      order,
      category: category === "ALL" ? undefined : category,
      pageNo,
      pageSize: 18
    }
  });
  const { totalPage, rows = [] } = data;

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (typeof totalPage === "number" && totalPage !== count) {
      setCount(totalPage);
    }
  }, [totalPage]);

  // 点击标签
  const handleTagClick = tag => {
    // 如果标签已选中，则取消选中，否则选中该标签
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(it => it !== tag)
      : [...selectedTags, tag];
    setState({ selectedTags: newTags, pageNo: 1 });
  };

  // 分页
  const renderPagination = () => {
    return (
      <Box sx={{ my: 2, display: "flex", justifyContent: "flex-start" }}>
        <Pagination
          variant="outlined"
          color="primary"
          shape="rounded"
          size="large"
          count={count}
          page={pageNo}
          onChange={(ev, value) => {
            setState({ pageNo: value });
            window.scrollTo({
              top: 0
            });
          }}
        />
      </Box>
    );
  };

  const commonProps = { handleTagClick, refetch };

  return (
    <Container className="pt-4 md:pt-10 pb-6">
      <div className="flex justify-end pb-8">
        <TextField
          label="搜索"
          variant="standard"
          size="small"
          placeholder="输入关键词搜索"
          onKeyPress={ev => {
            if (ev.key.toUpperCase() === "ENTER") {
              setState({ keyword: ev.target.value });
            }
          }}
        />
      </div>
      <BookFilter handleTagClick={handleTagClick} />

      {renderPagination()}

      <SkeletonList loading={isLoading} count={5} />

      {!isEmpty(rows) ? (
        <Box pt={2}>
          <Stack spacing={2}>
            {rows.map(it => {
              return <BookItem {...it} key={it.id} {...commonProps} />;
            })}
          </Stack>

          {renderPagination()}
        </Box>
      ) : isLoading ? null : (
        <Empty />
      )}
    </Container>
  );
};

export default Book;
