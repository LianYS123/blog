import { Box, Stack } from "@mui/material";
import { Empty } from "components/empty";
import { SkeletonList } from "components/skeleton";
import { useFetchList } from "hooks";
import { SPACE_MOMENT_LIST } from "services/space";
import { MyMomentItem } from "./MyMomentItem";

export const MyMomentList = () => {
  const {
    list = [],
    loadingFirstPage,
    loadingMore,
    loading,
    search,
    reload
  } = useFetchList({
    service: SPACE_MOMENT_LIST
  });
  return (
    <Box>
      <SkeletonList loading={loadingFirstPage} />
      {list.length ? (
        <Stack spacing={2}>
          {list.map(it => (
            <MyMomentItem key={it.id} {...it} />
          ))}
        </Stack>
      ) : loading ? null : (
        <Empty reload={reload} />
      )}

      <SkeletonList loading={loadingMore} />
    </Box>
  );
};
