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
import React from "react";
import Masonry from "@mui/lab/Masonry";
import { Article as ArticleIcon, GitHub, Web } from "@mui/icons-material";
import { PROJECT_ITEMS } from "./config";

const Home = () => {
  const theme = useTheme();
  const upSM = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Container>
      {/* 项目列表 */}
      <div className="px-2">
        <Masonry
          style={{ margin: upSM ? undefined : 0 }}
          columns={{ xs: 1, sm: 2, md: 4 }}
          spacing={2}
        >
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
    </Container>
  );
};

export default Home;
