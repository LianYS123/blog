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
import { Box } from "@mui/system";
import {
  ArrowBackRounded,
  ArrowForwardRounded,
  Article as ArticleIcon,
  GitHub,
  Web
} from "@mui/icons-material";
import routers from "routers";
import { useHistory } from "react-router-dom";
import { useRequest } from "hooks";
import { PROJECT_LIST } from "services/project";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { useRef } from "react";

export const ProjectList = () => {
  const history = useHistory();
  const { data: projectItems = [] } = useRequest({
    service: PROJECT_LIST
  });
  const swiperRef = useRef();
  // const swiper = useSwiper();
  const swiper = swiperRef.current;

  return (
    <Box className="bg-neutral py-20">
      <Container>
        <div className="flex justify-between items-center">
          <Typography sx={{ color: "white" }} variant="h5">
            我的项目
          </Typography>
          <div className="flex space-x-2 text-white">
            <IconButton
              sx={{ color: "white" }}
              // disabled={swiper?.allowSlidePrev}
              onClick={() => {
                //
                swiper.slidePrev();
              }}
            >
              <ArrowBackRounded />
            </IconButton>
            <IconButton
              sx={{ color: "white" }}
              // disabled={swiper?.allowSlideNext}
              onClick={() => {
                //
                swiper.slideNext();
              }}
            >
              <ArrowForwardRounded />
            </IconButton>
          </div>
        </div>
      </Container>

      {/* <Divider /> */}
      <Box sx={{ py: 6, pl: { xs: 2, sm: 4 } }}>
        <Swiper
          onSwiper={s => (swiperRef.current = s)}
          slidesPerView={"auto"}
          spaceBetween={30}
        >
          {projectItems.map((item, index) => (
            <SwiperSlide style={{ width: "auto" }} key={index}>
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
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};
