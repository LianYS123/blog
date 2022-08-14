import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography
} from "@mui/material";
import { Box } from "@mui/system";
import { SkeletonList } from "components/skeleton";
import { useModalAction, useCustomMutation, useRequest } from "hooks";
import { SPACE_COLLECTION_LIST } from "services/space";
import { EditCollectionDialog } from "components/collection/EditCollectionDialog";
import { ActionMenuButton } from "components/action/ActionMenuButton";
import { DELETE_COLLECTION } from "services/collection";
import { useAlertDialog } from "providers/AlertDialogProvider";
import { ArticleCollectionDrawer } from "./ArticleCollectionDrawer";
import { useHistoryState } from "hooks";
import _ from "lodash";
import { COLLECTION_TYPES, HOME_SECTION_TYPES } from "constants/index";
import { ResourceCollectionDrawer } from "./ResourceCollectionDrawer";
import { AddToHomeButton } from "components/homeSection/AddToHomeButton";

const CollectionList = ({ collections = [], refetch, type }) => {
  // 弹出收藏夹文章列表抽屉
  const { state, setState } = useHistoryState();

  // 编辑收藏夹弹出框
  const { open: openEditCollectionDialog, ...modalProps } = useModalAction();
  const { open: openAlertDialog } = useAlertDialog();

  // 删除收藏夹
  const [deleteCollection] = useCustomMutation(DELETE_COLLECTION);

  const handleDelete = item => {
    openAlertDialog({
      title: "提示",
      content: "你确定要删除这个收藏夹吗？",
      onOk: async () => {
        const { success } = await deleteCollection({ collectionId: item.id });
        if (success) {
          refetch();
        }
      }
    });
  };

  const getSectionType = () => {
    switch (type) {
      case COLLECTION_TYPES.ARTICLE:
        return HOME_SECTION_TYPES.ARTICLE_COLLECTION;

      case COLLECTION_TYPES.RESOURCE:
        return HOME_SECTION_TYPES.RESOURCE_COLLECTION;

      case COLLECTION_TYPES.BOOK:
        return HOME_SECTION_TYPES.BOOK_COLLECTION;
      default:
        break;
    }
  };

  const sectionType = getSectionType();

  return (
    <>
      <Grid container spacing={3}>
        {collections.map(item => {
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
                      collectionDrawerVisible: true,
                      collectionType: type
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
                </CardActionArea>
                <CardContent className="flex justify-between">
                  <div>{collectionDesc}</div>
                  <AddToHomeButton sectionType={sectionType} record={item} />
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <EditCollectionDialog reload={refetch} {...modalProps} />
    </>
  );
};

export const Collection = () => {
  // 收藏夹列表
  const {
    data = [],
    loading,
    refetch
  } = useRequest({
    service: SPACE_COLLECTION_LIST
  });

  // 弹出收藏夹文章列表抽屉
  const { state, setState } = useHistoryState();
  const {
    collectionDrawerVisible = false,
    drawerCollectionId,
    collectionType
  } = state;

  const articleCollections = data.filter(
    it => it.collectionType === COLLECTION_TYPES.ARTICLE
  );
  const resourceCollections = data.filter(
    it => it.collectionType === COLLECTION_TYPES.RESOURCE
  );

  const drawerProps = {
    visible: collectionDrawerVisible,
    id: drawerCollectionId,
    open: () => setState({ collectionDrawerVisible: true }),
    close: () => setState({ collectionDrawerVisible: false })
  };

  return (
    <Box>
      <SkeletonList loading={loading} />

      <Typography
        className="border-l-4"
        sx={{
          borderColor: theme => theme.palette.primary.main,
          pl: 2,
          mb: 3
          // mt: 2
        }}
        variant="h5"
        gutterBottom
      >
        文章
      </Typography>
      <CollectionList
        type={COLLECTION_TYPES.ARTICLE}
        collections={articleCollections}
        refetch={refetch}
      />

      <Typography
        className="border-l-4"
        sx={{
          borderColor: theme => theme.palette.primary.main,
          pl: 2,
          mb: 3,
          mt: 6
        }}
        mt={4}
        variant="h5"
        gutterBottom
      >
        资源
      </Typography>
      <CollectionList
        type={COLLECTION_TYPES.RESOURCE}
        collections={resourceCollections}
        refetch={refetch}
      />

      {collectionType === COLLECTION_TYPES.ARTICLE && (
        <ArticleCollectionDrawer {...drawerProps} />
      )}

      {collectionType === COLLECTION_TYPES.RESOURCE && (
        <ResourceCollectionDrawer {...drawerProps} />
      )}

      {/* {!loading && !data.length ? (
        <Button onClick={() => openEditCollectionDialog({ isEdit: false })}>
          创建收藏夹
        </Button>
      ) : null} */}
    </Box>
  );
};
