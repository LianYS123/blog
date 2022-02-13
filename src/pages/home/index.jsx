import { Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { SkeletonList } from "components/skeleton";
import { useFetchList } from "hooks";
import { Article } from "pages/article/Article";
import React from "react";
import { ARTICLE_LIST } from "services/article";

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
    <div className="py-4 md:pb-16 container">
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
      <div className="space-y-3 mb-4">
        <SkeletonList loading={loadingFirstPage} />
        {list.map(it => (
          <Article key={it.id} {...it} />
        ))}
        <SkeletonList loading={loadingMore} />
      </div>
    </div>
  );
};

export default Home;
