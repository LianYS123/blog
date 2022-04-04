import { ArrowForward, ArrowRightAltRounded } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography
} from "@mui/material";
import { HOME_SECTION_TYPES } from "constants/index";
import { useSectionListByType } from "hooks/app";
import { Link } from "react-router-dom";
import routers from "routers";

export const ArticleSection = () => {
  //
  const list = useSectionListByType(HOME_SECTION_TYPES.ARTICLE);
  return (
    <Container>
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4">博客文章</Typography>
        <Link to={routers.ARTICLE_LIST} className="flex items-center text-lg">
          <span className="mr-2">查看全部</span>
          <ArrowForward />
        </Link>
      </div>
      <Grid container spacing={4}>
        {list.map(item => {
          const { itemId, itemName, itemImage } = item;
          return (
            <Grid xs={12} sm={6} md={4} item key={itemId}>
              <Card>
                <CardActionArea
                  component={Link}
                  to={routers.DETAIL.replace(":id", itemId)}
                >
                  <CardMedia
                    sx={{ height: 250 }}
                    component="img"
                    src={itemImage}
                  />
                  <CardContent>
                    <Typography variant="subtitle1">{itemName}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
