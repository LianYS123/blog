import {
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip
} from "@mui/material";
import { Empty } from "components/empty";
import { SkeletonList } from "components/skeleton";
import { useFetchList, useCustomMutation } from "hooks";
import { CommonDrawer } from "components/drawer";
import {
  PAGE_COLLECTION_RESOURCES,
  REMOVE_RESOURCE_FROM_COLLECTION
} from "services/collection-resource";
import { ResourceList } from "pages/resource/ResourceList";
import { Apps, Dashboard, TableRows } from "@mui/icons-material";
import { useState } from "react";

export const ResourceCollectionDrawer = props => {
  const {
    id: collectionId,
    open: openDrawer,
    visible: drawerVisible,
    close: closeDrawer
  } = props;
  const {
    list = [],
    total,
    loadingFirstPage,
    isFetchingNextPage,
    isLoading,
    scrollRef,
    removeItemById,
    reload
  } = useFetchList({
    service: PAGE_COLLECTION_RESOURCES,
    params: { collectionId },
    ready: !!collectionId && drawerVisible
  });
  // const total = data?.[0]?.totalRows || 0;
  const [removeFromCollection] = useCustomMutation(
    REMOVE_RESOURCE_FROM_COLLECTION
  );
  // 删除
  const handleDelete = async resourceId => {
    const { success } = await removeFromCollection({
      resourceId,
      collectionId
    });
    if (success) {
      removeItemById(resourceId);
    }
  };

  const [layout, setLayout] = useState("single");

  const layouts = [
    {
      icon: <TableRows />,
      layout: "single",
      tip: "单列"
    },
    {
      icon: <Apps />,
      layout: "grid",
      tip: "网格"
    },
    {
      icon: <Dashboard />,
      layout: "masonry",
      tip: "瀑布流"
    }
  ];

  return (
    <CommonDrawer
      title={`${total} 项`}
      open={drawerVisible}
      onOpen={() => openDrawer()}
      onClose={closeDrawer}
      extra={
        <ToggleButtonGroup
          size="small"
          exclusive
          value={layout}
          onChange={(ev, value) => setLayout(value)}
        >
          {layouts.map(({ icon, tip, layout }) => (
            <ToggleButton key={layout} size="small" value={layout}>
              <Tooltip title={tip}>{icon}</Tooltip>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      }
    >
      <Container
        ref={scrollRef}
        sx={{ height: "100%", overflow: "auto", py: 6 }}
      >
        <SkeletonList loading={loadingFirstPage} />
        {list.length ? (
          <ResourceList
            rows={list}
            layout={layout}
            actions={[{ text: "删除", onClick: id => handleDelete(id) }]}
          />
        ) : isLoading ? null : (
          <Empty reload={reload} />
        )}

        <SkeletonList loading={isFetchingNextPage} />
      </Container>
    </CommonDrawer>
  );
};
