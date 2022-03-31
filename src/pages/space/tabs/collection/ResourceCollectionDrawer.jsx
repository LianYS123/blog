import { Container, Stack } from "@mui/material";
import { Empty } from "components/empty";
import { SkeletonList } from "components/skeleton";
import { useFetchList, useCustomMutation } from "hooks";
import { ActionMenuButton } from "components/action/ActionMenuButton";
import { CommonDrawer } from "components/drawer";
import {
  PAGE_COLLECTION_RESOURCES,
  REMOVE_RESOURCE_FROM_COLLECTION
} from "services/collection-resource";
import ResourceItem from "pages/resource/ResourceItem";

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

  return (
    <CommonDrawer
      title={`${total} 项`}
      open={drawerVisible}
      onOpen={() => openDrawer()}
      onClose={closeDrawer}
    >
      <Container ref={scrollRef} sx={{ height: "100%", overflow: "auto" }}>
        <SkeletonList loading={loadingFirstPage} />
        {list.length ? (
          <Stack sx={{ py: 4 }} spacing={2}>
            {list.map(it => (
              <ResourceItem
                key={it.id}
                headerProps={{
                  action: (
                    <ActionMenuButton
                      actions={[
                        { text: "删除", onClick: () => handleDelete(it.id) }
                      ]}
                    />
                  )
                }}
                {...it}
              />
            ))}
          </Stack>
        ) : isLoading ? null : (
          <Empty reload={reload} />
        )}

        <SkeletonList loading={isFetchingNextPage} />
      </Container>
    </CommonDrawer>
  );
};
