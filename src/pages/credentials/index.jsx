import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import React from "react";
import Masonry from "@mui/lab/Masonry";
import { Article as ArticleIcon, GitHub, Web } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import routers from "routers";
import { useRequest } from "hooks";
import { PROJECT_LIST } from "services/project";

const Credentials = () => {
  const theme = useTheme();
  const upSM = useMediaQuery(theme.breakpoints.up("sm"));
  const history = useHistory();
  const { data: projectItems = [] } = useRequest({
    service: PROJECT_LIST,
    initialData: []
  });

  return (
    <Masonry
      style={{ margin: upSM ? undefined : 0 }}
      columns={{ xs: 1, sm: 2, md: 3 }}
      spacing={2}
    >
      {/* 项目列表 */}
      {projectItems.map((item, index) => (
        <Card key={index}>
          <CardActionArea
            onClick={() => {
              if (item.articleId) {
                history.push(routers.DETAIL.replace(":id", item.articleId));
              } else if (item.web) {
                window.open(item.web);
              }
            }}
          >
            <CardHeader title={item.title} subheader={item.subTitle} />
            <CardMedia
              component="img"
              alt={item.title}
              height="164"
              src={item.img}
            />
            <CardContent>
              <Typography variant="body2">{item.description}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Masonry>
  );
};

export default Credentials;
