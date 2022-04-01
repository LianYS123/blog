import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
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
import AppHeader from "layout/header";
import { AppFooter } from "layout/footer";
import { Box } from "@mui/system";

const Home = () => {
  useAppTitle();
  const upSM = useUpSM();
  const history = useHistory();
  const { data: projectItems = [] } = useRequest({
    service: PROJECT_LIST
  });

  return (
    <Container>
      <AppHeader />
      <div className="hero min-h-screen mb-16">
        <div className="hero-content">
          <div>
            <Typography variant="h1" gutterBottom>
              记录技术、生活和有趣的事
            </Typography>
            <Typography
              sx={{ maxWidth: { md: "50%", sm: "100%" } }}
              variant="subtitle1"
            >
              这是我个人维护的一个空间，是我一直以来的一些想法的实现。我把一些技术和总结放在这里，有时也会有一些想法和心情。
              我希望它可以是一个以文字内容为主体的社区，有专属于文字的风格和感觉，每一处都是记述和表达。
            </Typography>
          </div>
        </div>
      </div>
      <Box>
        <Typography gutterBottom variant="h4">
          其他项目
        </Typography>
        <Divider />
        <div className="carousel space-x-8 mt-4 py-2 px-4">
          {projectItems.map((item, index) => (
            <div key={index} className="carousel-item">
              <Card
                sx={{
                  width: { sm: 405, xs: "100vw" },
                  height: { sm: 560, xs: "auto" }
                }}
              >
                <CardActionArea
                  onClick={() => {
                    if (item.web) {
                      window.open(item.web, "_blank");
                    } else if (item.articleId) {
                      history.push(
                        routers.DETAIL.replace(":id", item.articleId)
                      );
                    }
                  }}
                >
                  <CardHeader title={item.title} subheader={item.subTitle} />
                  <CardMedia
                    component="img"
                    alt={item.title}
                    sx={{ height: { sm: 360, xs: 360 } }}
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
            </div>
          ))}
        </div>
        <AppFooter />
      </Box>
    </Container>
  );
};

export default Home;
