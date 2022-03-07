import { Box, Stack } from "@mui/material";
import { Empty } from "components/empty";
import { SkeletonList } from "components/skeleton";
import { useFetchList } from "hooks";
import { MomentItem } from "pages/moment/MomentItem";
import { useSelector } from "react-redux";
import { SPACE_MOMENT_LIST } from "services/space";

export const MyMomentList = () => {
  const {
    list = [],
    loadingFirstPage,
    loadingMore,
    loading,
    search,
    removeItemById,
    editItem,
    reload
  } = useFetchList({
    service: SPACE_MOMENT_LIST
  });
  const { userInfo = {} } = useSelector(state => state.app);
  const { avatarUrl, nickName } = userInfo;
  return (
    <Box>
      <SkeletonList loading={loadingFirstPage} />
      {list.length ? (
        <Stack spacing={2}>
          {list.map(it => (
            <MomentItem
              authorName={nickName}
              authorAvatar={avatarUrl}
              key={it.id}
              removeItemById={removeItemById}
              editItem={editItem}
              {...it}
            />
          ))}
        </Stack>
      ) : loading ? null : (
        <Empty reload={reload} />
      )}

      <SkeletonList loading={loadingMore} />
    </Box>
  );
};
