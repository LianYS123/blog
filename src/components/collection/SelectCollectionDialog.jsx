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
  Stack
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/system";

import {
  ADD_ARTICLE_TO_COLLECTION,
  COLLECTION_ARTICLE_LIST,
  REMOVE_FROM_COLLECTION
} from "services/collection";
import { useModalAction, useCustomMutation, useRequest } from "hooks";
import { CheckCircleOutlined } from "@mui/icons-material";
import { EditCollectionDialog } from "./EditCollectionDialog";
import { noop } from "lodash";

const CollectionItemCard = props => {
  const {
    collectionName,
    collectionDesc,
    id,
    cover,
    exist,
    articleId,
    reload,
    onChange = noop
  } = props;

  // 添加文章到收藏夹
  const [addArticle, { loading: loadingAdd }] = useCustomMutation(
    ADD_ARTICLE_TO_COLLECTION
  );

  // 从收藏夹中移除文章
  const [removeArticle, { loading: loadingRemove }] = useCustomMutation(
    REMOVE_FROM_COLLECTION
  );

  const loading = loadingAdd || loadingRemove;

  // 点击收藏夹，添加或移除文章
  const handleCollectionClick = async () => {
    if (loading) {
      return;
    }
    if (exist) {
      await removeArticle({ articleId, collectionId: id });
    } else {
      await addArticle({ articleId, collectionId: id });
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

export const CollectionDialog = ({
  visible,
  close,
  articleId,
  onChange = noop
}) => {
  // 当前用户的所有收藏夹
  const {
    data: collections,
    loading,
    refetch
  } = useRequest({
    service: COLLECTION_ARTICLE_LIST,
    params: { articleId }
  });

  // 创建收藏夹弹出框
  const { open: openDialog, ...modalProps } = useModalAction();

  return (
    <Dialog fullWidth open={visible} onClose={close}>
      <DialogTitle>收藏</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          {(collections || []).map(item => (
            <CollectionItemCard
              {...item}
              key={item.id}
              onChange={onChange}
              articleId={articleId}
              reload={refetch}
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
      <EditCollectionDialog reload={refetch} {...modalProps} />
    </Dialog>
  );
};
