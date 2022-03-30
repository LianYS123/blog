import React from "react";
import { useHistoryState, useRequest } from "hooks";
import { SkeletonList } from "components/skeleton";
import {
  Box,
  Container,
  Grid,
  Pagination,
  Stack,
  TextField
} from "@mui/material";
import { Empty } from "components/empty";
import { ResourceFilter } from "./Filter";
import ResourceItem from "./ResourceItem";
import { Masonry } from "@mui/lab";
import SingleRsItem from "./SingleRsItem";
import { RESOURCE_PAGE } from "services/resource";
import { isEmpty } from "lodash";

const Resource = () => {
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
          count={totalPage}
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

  // 网格
  const renderGrid = () => {
    return (
      <Grid container spacing={2}>
        {rows.map(it => {
          return (
            <Grid item key={it.id} xs={12} sm={6} md={4}>
              <ResourceItem {...it} {...commonProps} />
            </Grid>
          );
        })}
      </Grid>
    );
  };

  // 瀑布流
  const renderMasonry = () => {
    return (
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={4}>
        {rows.map(it => {
          return <ResourceItem {...it} key={it.id} {...commonProps} />;
        })}
      </Masonry>
    );
  };

  // 单列
  const renderSingle = () => {
    return (
      <Stack spacing={2}>
        {rows.map(it => {
          return <SingleRsItem {...it} key={it.id} {...commonProps} />;
        })}
      </Stack>
    );
  };

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
          {layout === "grid" && renderGrid()}
          {layout === "single" && renderSingle()}
          {layout === "masonry" && renderMasonry()}

          {renderPagination()}
        </Box>
      ) : isLoading ? null : (
        <Empty />
      )}
    </Container>
  );
};

export default Resource;
