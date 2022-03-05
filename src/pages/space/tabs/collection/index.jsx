import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton
} from "@mui/material";
import { Box } from "@mui/system";
import { SkeletonList } from "components/skeleton";
import { useModalAction, useRequest } from "hooks";
import { SPACE_COLLECTION_LIST } from "services/space";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { EditCollectionDialog } from "./EditCollectionDialog";
import { CommonDrawer } from "components/drawer";
import { CollectionArticleList } from "./CollectionArticleList";

export const Collection = () => {
  const {
    data = [],
    loading,
    reload
  } = useRequest({
    service: SPACE_COLLECTION_LIST,
    initialData: []
  });
  const { open: openDialog, ...modalProps } = useModalAction();
  const {
    open: openDrawer,
    visible: drawerVisible,
    close: closeDrawer,
    ...collectionArticleListProps
  } = useModalAction();
  return (
    <Box>
      <SkeletonList loading={loading} />
      <Grid container spacing={2}>
        {data.map(item => {
          const { collectionName, collectionDesc, id, cover } = item;
          return (
            <Grid item key={id} xs={6} md={4}>
              <Card onClick={() => openDrawer(item)}>
                <CardActionArea>
                  <CardHeader
                    title={collectionName}
                    action={
                      <IconButton
                        onClick={ev => {
                          ev.stopPropagation();
                          openDialog({ isEdit: true, record: item });
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                  />
                  {cover ? <CardMedia component="img" src={cover} /> : null}
                  <CardContent>{collectionDesc}</CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {!loading && !data.length ? (
        <Button onClick={() => openDialog({ isEdit: false })}>
          创建收藏夹
        </Button>
      ) : null}
      <EditCollectionDialog reload={reload} {...modalProps} />
      <CommonDrawer
        open={drawerVisible}
        onOpen={() => openDrawer()}
        onClose={closeDrawer}
      >
        <CollectionArticleList {...collectionArticleListProps} />
      </CommonDrawer>
    </Box>
  );
};
