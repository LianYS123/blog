import React, { useEffect, useState } from "react";
import { useHistoryState, useModalAction, useRequest } from "hooks";
import { SkeletonList } from "components/skeleton";
import {
  Box,
  Button,
  Container,
  IconButton,
  Pagination,
  TextField
} from "@mui/material";
import { Empty } from "components/empty";
import { ResourceFilter } from "./Filter";
import { RESOURCE_PAGE } from "services/resource";
import { isEmpty } from "lodash";
import { ResourceList } from "./ResourceList";
import { EditResourceDialog } from "./EditResourceDialog";
import { Edit } from "@mui/icons-material";
import { useIsAdmin } from "hooks/app";

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

  const isAdmin = useIsAdmin();

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (typeof totalPage === "number" && totalPage !== count) {
      setCount(totalPage);
    }
  }, [totalPage]);

  const { open, ...modalProps } = useModalAction();

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

  const renderEditIcon = record => {
    if (!isAdmin) {
      return null;
    }
    return (
      <IconButton onClick={() => open({ record, isEdit: true })}>
        <Edit />
      </IconButton>
    );
  };

  const commonProps = { handleTagClick, refetch, renderEditIcon };

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

      <div className="flex justify-between items-center">
        <div>{renderPagination()}</div>
        {isAdmin ? (
          <Box>
            <Button variant="outlined" onClick={() => open({ isEdit: false })}>
              添加资源
            </Button>
          </Box>
        ) : null}
      </div>

      <SkeletonList loading={isLoading} count={5} />
      {!isEmpty(rows) ? (
        <Box pt={2}>
          <ResourceList layout={layout} rows={rows} {...commonProps} />
          {renderPagination()}
        </Box>
      ) : isLoading ? null : (
        <Empty />
      )}
      <EditResourceDialog reload={refetch} {...modalProps} />
    </Container>
  );
};

export default Resource;
