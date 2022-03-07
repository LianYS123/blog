import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid
} from "@mui/material";
import { Box } from "@mui/system";
import { SkeletonList } from "components/skeleton";
import { useModalAction, useMutation, useRequest } from "hooks";
import { SPACE_COLLECTION_LIST } from "services/space";
import { EditCollectionDialog } from "components/collection/EditCollectionDialog";
import { ActionMenuButton } from "components/action/ActionMenuButton";
import { DELETE_COLLECTION } from "services/collection";
import { useAlertDialog } from "providers/AlertDialogProvider";
import { CollectionDrawer } from "./CollectionDrawer";
import { useHistoryState } from "hooks";

export const Collection = () => {
  // 收藏夹列表
  const {
    data = [],
    loading,
    reload
  } = useRequest({
    service: SPACE_COLLECTION_LIST,
    initialData: []
  });

  // 弹出收藏夹文章列表抽屉
  const { state, setState } = useHistoryState();
  const { collectionDrawerVisible = false, drawerCollectionId } = state;

  // 编辑收藏夹弹出框
  const { open: openEditCollectionDialog, ...modalProps } = useModalAction();

  const { open: openAlertDialog } = useAlertDialog();

  // 删除收藏夹
  const [deleteCollection] = useMutation(DELETE_COLLECTION);

  const handleDelete = item => {
    openAlertDialog({
      title: "提示",
      content: "你确定要删除这个收藏夹吗？",
      onOk: async () => {
        const { success } = await deleteCollection({ collectionId: item.id });
        if (success) {
          reload();
        }
      }
    });
  };

  return (
    <Box>
      <SkeletonList loading={loading} />
      <Grid container spacing={2}>
        {data.map(item => {
          const { collectionName, collectionDesc, id, cover } = item;
          // 操作按钮
          const actions = [
            {
              text: "编辑",
              onClick: () => {
                openEditCollectionDialog({ isEdit: true, record: item });
              }
            },
            {
              text: "删除",
              onClick: () => {
                handleDelete(item);
              }
            }
          ];
          return (
            <Grid item key={id} xs={12} sm={6} md={4}>
              <Card sx={{ height: 320 }}>
                <CardHeader
                  title={collectionName}
                  action={<ActionMenuButton actions={actions} />}
                />
                <CardActionArea
                  onClick={() =>
                    setState({
                      drawerCollectionId: item.id,
                      collectionDrawerVisible: true
                    })
                  }
                >
                  {cover ? (
                    <CardMedia
                      sx={{ height: 200 }}
                      component="img"
                      src={cover}
                    />
                  ) : null}
                  <CardContent>{collectionDesc}</CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {!loading && !data.length ? (
        <Button onClick={() => openEditCollectionDialog({ isEdit: false })}>
          创建收藏夹
        </Button>
      ) : null}
      <EditCollectionDialog reload={reload} {...modalProps} />
      <CollectionDrawer
        visible={collectionDrawerVisible}
        id={drawerCollectionId}
        open={() => setState({ collectionDrawerVisible: true })}
        close={() => setState({ collectionDrawerVisible: false })}
      />
    </Box>
  );
};
