import { Box, Stack } from "@mui/material";
import { Empty } from "components/empty";
import { SkeletonList } from "components/skeleton";
import { useFetchList } from "hooks";
import CardArticle from "pages/article/card/CardArticle";
import { SPACE_ARTICLE_LIST } from "services/space";
import { MyArticleItem } from "./MyArticleItem";

export const MyArticleList = () => {
  const {
    list = [],
    loadingFirstPage,
    loadingMore,
    loading,
    search,
    reload
  } = useFetchList({
    service: SPACE_ARTICLE_LIST
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
