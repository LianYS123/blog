import { Container, Stack, Typography } from "@mui/material";
import { Empty } from "components/empty";
import { SkeletonList } from "components/skeleton";
import { useFetchList, useCustomMutation } from "hooks";
import {
  PAGE_COLLECTION_ARTICLES,
  REMOVE_ARTICLE_FROM_COLLECTION
} from "services/collection-article";
import { ActionMenuButton } from "components/action/ActionMenuButton";
import CardArticle from "./CardArticle";
import { CommonDrawer } from "components/drawer";

export const ArticleCollectionDrawer = props => {
  const {
    id: collectionId,
    open: openDrawer,
    hideActions = false,
    visible: drawerVisible,
    close: closeDrawer
  } = props;
  const {
    data,
    list = [],
    total,
    loadingFirstPage,
    isFetchingNextPage,
    isLoading,
    scrollRef,
    removeItemById,
    reload
  } = useFetchList({
    service: PAGE_COLLECTION_ARTICLES,
    params: { collectionId },
    ready: !!collectionId && drawerVisible
  });
  // const total = data?.[0]?.totalRows || 0;
  const [removeFromCollection] = useCustomMutation(
    REMOVE_ARTICLE_FROM_COLLECTION
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
                headerProps={
                  hideActions
                    ? undefined
                    : {
                        action: (
                          <ActionMenuButton
                            actions={[
                              {
                                text: "删除",
                                onClick: () => handleDelete(it.id)
                              }
                            ]}
                          />
                        )
                      }
                }
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
