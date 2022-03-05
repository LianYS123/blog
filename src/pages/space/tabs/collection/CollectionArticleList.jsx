import { Box } from "@mui/system";
import { Empty } from "components/empty";
import { SkeletonList } from "components/skeleton";
import { useFetchList } from "hooks";
import { Stack } from "immutable";
import CardArticle from "pages/article/CardArticle";
import { PAGE_COLLECTION_ARTICLES } from "services/collection";

export const CollectionArticleList = props => {
  const { id: collectionId } = props;
  const {
    list = [],
    loadingFirstPage,
    loadingMore,
    loading,
    search,
    reload
  } = useFetchList({
    service: PAGE_COLLECTION_ARTICLES,
    necessaryParams: { collectionId },
    ready: !!collectionId
  });
  return (
    <Box>
      <SkeletonList loading={loadingFirstPage} />
      {list.length ? (
        <Stack spacing={2}>
          {list.map(it => (
            <CardArticle key={it.id} {...it} />
            // <MyArticleItem key={it.id} {...it} />
          ))}
        </Stack>
      ) : loading ? null : (
        <Empty reload={reload} />
      )}

      <SkeletonList loading={loadingMore} />
    </Box>
  );
};
