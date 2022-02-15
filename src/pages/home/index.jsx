import {
  Card,
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
import { Box } from "@mui/system";
import { SkeletonList } from "components/skeleton";
import { useFetchList } from "hooks";
import { Article } from "pages/article/Article";
import React from "react";
import { ARTICLE_LIST } from "services/article";
import Masonry from "@mui/lab/Masonry";
import { Article as ArticleIcon, GitHub, Web } from "@mui/icons-material";
import { PROJECT_ITEMS } from "./config";

const Home = () => {
  const {
    list = [],
    loadingFirstPage,
    loadingMore
  } = useFetchList({
    service: ARTICLE_LIST
  });
  const theme = useTheme();
  const upSM = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Container className="md:pb-16 p-4">
      {/* Banner */}
      <div className="mb-8 rounded-md overflow-hidden">
        <Box sx={{ height: { xs: "40vw", sm: "30vw" }, position: "relative" }}>
          <img
            className="w-full h-full object-cover object-center"
            src="https://liuli-1259462774.cos.ap-shanghai.myqcloud.com/c39d7a8e-90fb-4ec3-9db4-6eb4d728ff92cat-6747298_1280.jpeg"
          />
          <div className="absolute left-3 bottom-2 sm:left-6 sm:bottom-4 text-white">
            {upSM ? (
              <Typography variant="body2" component="div">
                记录生活、技术和有趣的事
              </Typography>
            ) : (
              <Typography variant="body1" component="div">
                记录生活、技术和有趣的事
              </Typography>
            )}
          </div>
        </Box>
      </div>

      {/* 项目列表 */}

      <div className="px-2">
        <div className="mb-4">
          <Typography variant="h6" gutterBottom>
            我的项目
          </Typography>
          <Typography className="font-light" variant="body1">
            做过一些有趣的项目
          </Typography>
        </div>
        <Masonry columns={{ xs: 1, sm: 2, md: 4 }} spacing={2}>
          {PROJECT_ITEMS.map((item, index) => (
            <Card key={index}>
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
                {item.article && (
                  <Tooltip title="文章">
                    <IconButton target="_blank" href={item.article}>
                      <ArticleIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </CardActions>
            </Card>
          ))}
        </Masonry>
      </div>

      <div className="h-16"></div>
      {/* 文章 */}

      {/* <div className="mb-4">
        <Typography variant="h6" gutterBottom>
          文章
        </Typography>
        <Typography className="font-light" variant="body1">
          文章推荐
        </Typography>
      </div> */}

      <div className="space-y-3 mb-4 px-4">
        <SkeletonList loading={loadingFirstPage} />
        {list.map(it => (
          <Article key={it.id} {...it} />
        ))}
        <SkeletonList loading={loadingMore} />
      </div>
    </Container>
  );
};

export default Home;
