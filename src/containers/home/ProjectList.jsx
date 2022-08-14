import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Tooltip,
  Typography
} from "@mui/material";
import { Article as ArticleIcon, GitHub, Web } from "@mui/icons-material";
import routers from "routers";
import { useRequest } from "hooks";
import { PROJECT_LIST } from "services/project";

import { SwiperList } from "./components/SwiperList";
import { useRouter } from "next/router";

/**
 * 我的项目列表
 */
export const ProjectList = () => {
  const history = useRouter();
  const { data: projectItems = [] } = useRequest({
    service: PROJECT_LIST
  });

  return (
    <SwiperList
      title="项目"
      list={projectItems}
      renderItem={item => (
        <Card
          sx={{
            width: { sm: 405, xs: 300 },
            height: { sm: 560, xs: 480 }
          }}
        >
          <CardActionArea
            onClick={() => {
              if (item.web) {
                window.open(item.web, "_blank");
              } else if (item.github) {
                window.open(item.github, "_blank");
              } else if (item.articleId) {
                history.push(routers.DETAIL.replace(":id", item.articleId));
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
      )}
    />
  );
};
