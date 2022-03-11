import { Container, Stack, Typography } from "@mui/material";
import { Empty } from "components/empty";
import { SkeletonList } from "components/skeleton";
import { useFetchList, useMutation } from "hooks";
import {
  PAGE_COLLECTION_ARTICLES,
  REMOVE_FROM_COLLECTION
} from "services/collection";
import { ActionMenuButton } from "components/action/ActionMenuButton";
import CardArticle from "./CardArticle";
import { CommonDrawer } from "components/drawer";

export const CollectionDrawer = props => {
  const {
    id: collectionId,
    open: openDrawer,
    visible: drawerVisible,
    close: closeDrawer
  } = props;
  const {
    data,
    list = [],
    loadingFirstPage,
    loadingMore,
    loading,
    search,
    scrollRef,
    removeItemById,
    reload
  } = useFetchList({
    service: PAGE_COLLECTION_ARTICLES,
    necessaryParams: { collectionId },
    ready: !!collectionId
  });
  const total = data?.totalRows || 0;
  const [removeFromCollection, { loading: loadingRemove }] = useMutation(
    REMOVE_FROM_COLLECTION
  );
  // 删除
  const handleDelete = async articleId => {
    //
    const { success } = await removeFromCollection({ articleId, collectionId });
    if (success) {
      removeItemById(articleId);
    }
  };

  return (
    <CommonDrawer
      title={`${total} 篇文章`}
      open={drawerVisible}
      onOpen={() => openDrawer()}
      onClose={closeDrawer}
    >
      <Container ref={scrollRef} sx={{ height: "100%", overflow: "auto" }}>
        <SkeletonList loading={loadingFirstPage} />
        {list.length ? (
          <Stack sx={{ py: 4 }} spacing={2}>
            {list.map(it => (
              <CardArticle
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
        ) : loading ? null : (
          <Empty reload={reload} />
        )}

        <SkeletonList loading={loadingMore} />
      </Container>
    </CommonDrawer>
  );
};
