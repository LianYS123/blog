import React, { useEffect, useState } from "react";
import { useHistoryState, useRequest } from "hooks";
import { SkeletonList } from "components/skeleton";
import { Box, Container, Pagination, TextField } from "@mui/material";
import { Empty } from "components/empty";
import { ResourceFilter } from "./Filter";
import { RESOURCE_PAGE } from "services/resource";
import { isEmpty } from "lodash";
import { ResourceList } from "./ResourceList";
import { useTitle } from "react-use";

const Resource = () => {
  useTitle("资源");

  const { state, setState } = useHistoryState();

  const {
    selectedTags = [],
    keyword,
    order = "view_num",
    category = "ALL",
    pageNo = 1,
    layout = "masonry"
  } = state;

  const {
    data = {},
    isLoading,
    refetch
  } = useRequest({
    service: RESOURCE_PAGE,
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
              top: 0,
              behavior: "smooth"
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
      <ResourceFilter handleTagClick={handleTagClick} />
      {renderPagination()}

      <SkeletonList loading={isLoading} count={5} />
      {!isEmpty(rows) ? (
        <Box pt={2}>
          <ResourceList layout={layout} rows={rows} {...commonProps} />
          {renderPagination()}
        </Box>
      ) : isLoading ? null : (
        <Empty />
      )}
    </Container>
  );
};

export default Resource;
