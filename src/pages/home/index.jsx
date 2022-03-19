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
  Typography
} from "@mui/material";
import React from "react";
import Masonry from "@mui/lab/Masonry";
import { Article as ArticleIcon, GitHub, Web } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import routers from "routers";
import { useRequest, useUpSM } from "hooks";
import { PROJECT_LIST } from "services/project";
import { useAppTitle } from "hooks/app";

const Home = () => {
  useAppTitle();
  const upSM = useUpSM();
  const history = useHistory();
  const { data: projectItems = [] } = useRequest({
    service: PROJECT_LIST
  });

  return (
    <Container className="pt-2 md:pt-6">
      {/* 项目列表 */}
      <Masonry
        style={{ margin: upSM ? undefined : 0 }}
        columns={{ xs: 1, sm: 2, md: 3 }}
        spacing={2}
      >
        {projectItems.map((item, index) => (
          <Card key={index}>
            <CardActionArea
              onClick={() => {
                if (item.articleId) {
                  history.push(routers.DETAIL.replace(":id", item.articleId));
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
            {/* 操作栏 */}
            <CardActions>
              {item.github && (
                <Tooltip title="Github">
                  <IconButton href={item.github} target="_blank">
                    <GitHub />
                  </IconButton>
                </Tooltip>
              )}
              {item.web && (
                <Tooltip title="网站">
                  <IconButton target="_blank" href={item.web}>
                    <Web />
                  </IconButton>
                </Tooltip>
              )}
              {item.articleId && (
                <Tooltip title="文章">
                  <IconButton
                    target="_blank"
                    href={routers.DETAIL.replace(":id", item.articleId)}
                  >
                    <ArticleIcon />
                  </IconButton>
                </Tooltip>
              )}
            </CardActions>
          </Card>
        ))}
      </Masonry>
    </Container>
  );
};

export default Home;
