import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
  Stack
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/system";

import { useModalAction } from "hooks";
import { CheckCircleOutlined } from "@mui/icons-material";
import { EditCollectionDialog } from "./EditCollectionDialog";
import { noop } from "lodash";
import { useCollections } from "./hooks";
import { SkeletonList } from "components/skeleton";

const CollectionItemCard = props => {
  const {
    collectionName,
    collectionDesc,
    id,
    cover,
    exist,
    reload,
    onChange = noop,

    itemId,
    addItem,
    removeItem,
    loading
  } = props;

  // 点击收藏夹，添加或移除文章
  const handleCollectionClick = async () => {
    if (loading) {
      return;
    }
    if (exist) {
      await removeItem(itemId, id);
    } else {
      await addItem(itemId, id);
    }
    const { data: collections } = await reload();
    onChange(
      collections.some(it => it.exist),
      collections
    );
  };

  return (
    <Card
      sx={{
        height: 128
      }}
    >
      <CardActionArea
        sx={{
          position: "relative"
        }}
        onClick={ev => {
          ev.stopPropagation();
          handleCollectionClick();
        }}
      >
        {/* 如果该收藏夹中已存在此文章，则添加一个蒙版 */}
        {exist ? (
          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
              zIndex: 999,
              bgcolor: "rgba(80, 81, 193, 0.5)",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            <Box sx={{ marginRight: 2 }}>
              <CheckCircleOutlined sx={{ width: 32, height: 32 }} />
            </Box>
          </Box>
        ) : null}

        {/* 收藏夹 */}
        <Box display="flex">
          {cover ? (
            <CardMedia sx={{ width: 128 }} component="img" src={cover} />
          ) : null}
          <Box flex="auto">
            <CardHeader title={collectionName} />
            <CardContent>{collectionDesc}</CardContent>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};

/**
 * 选择收藏夹弹出框
 */
export const CollectionDialog = ({
  visible,
  close,
  itemId,
  onChange = noop,
  type
}) => {
  const {
    collections,
    isLoading,
    refetch,
    addItem,
    removeItem,
    loadingAdd,
    loadingRemove
  } = useCollections({ type, itemId });

  // 创建收藏夹弹出框
  const { open: openDialog, ...modalProps } = useModalAction();

  return (
    <Dialog fullWidth open={visible} onClose={close}>
      <DialogTitle>收藏</DialogTitle>
      <DialogContent>
        {isLoading && <Skeleton animation="wave" sx={{ height: 200 }} />}
        <Stack spacing={2}>
          {(collections || []).map(item => (
            <CollectionItemCard
              {...item}
              key={item.id}
              onChange={onChange}
              itemId={itemId}
              reload={refetch}
              loading={loadingAdd || loadingRemove}
              addItem={addItem}
              removeItem={removeItem}
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => openDialog({ isEdit: false })}>
          创建收藏夹
        </Button>
        <LoadingButton onClick={close}>完成</LoadingButton>
      </DialogActions>
      <EditCollectionDialog type={type} reload={refetch} {...modalProps} />
    </Dialog>
  );
};
