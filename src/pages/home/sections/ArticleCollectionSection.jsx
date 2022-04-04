import {
  Card,
  CardActionArea,
  CardMedia,
  Container,
  Divider,
  Stack,
  Typography
} from "@mui/material";
import { HOME_SECTION_TYPES } from "constants/index";
import { useHistoryState, useModalAction } from "hooks";
import { useSectionListByType } from "hooks/app";
import { ArticleCollectionDrawer } from "pages/space/tabs/collection/ArticleCollectionDrawer";

export const ArticleCollectionSection = () => {
  const list = useSectionListByType(HOME_SECTION_TYPES.ARTICLE_COLLECTION);
  const { state, setState } = useHistoryState();
  const { articleDrawerVisible = false, articleDrawerItemId } = state;
  const open = () => setState({ articleDrawerVisible: true });
  const close = () => setState({ articleDrawerVisible: false });
  return (
    <Container>
      <Stack spacing={8}>
        {list.map((item, index) => {
          const {
            itemId,
            itemName,
            itemImage,
            itemDesc,
            itemDetail,
            itemLink
          } = item;
          return (
            <div key={index}>
              <Typography variant="h4" gutterBottom>
                {itemName}
              </Typography>
              <Typography variant="subtitle1" mb={4}>
                {itemDesc}
              </Typography>
              <Card className="hero">
                <CardActionArea
                  onClick={() => {
                    setState({
                      articleDrawerItemId: itemId,
                      articleDrawerVisible: true
                    });
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      minHeight: "80vh"
                    }}
                    src={itemImage}
                  />
                </CardActionArea>
              </Card>
            </div>
          );
        })}
      </Stack>
      <ArticleCollectionDrawer
        hideActions={true}
        id={articleDrawerItemId}
        visible={articleDrawerVisible}
        open={open}
        close={close}
      />
    </Container>
  );
};
