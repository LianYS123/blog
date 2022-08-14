import {
  Container,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  Typography
} from "@mui/material";
import React from "react";
import { useTitle } from "react-use";
import { ProjectList } from "./ProjectList";
import { Box } from "@mui/system";
import { ArticleCollectionSection } from "./sections/ArticleCollectionSection";
import { ResourceSection } from "./sections/ResourceSection";
import { MomentSection } from "./sections/MomentSection";
import { ArticleSection } from "./sections/ArticleSection";
import { ResourceCollectionSection } from "./sections/ResourceCollectionSection";

const Home = () => {
  useTitle("首页");

  return (
    <>
      {/* <AppHeader /> */}
      <Container>
        {/* <ScrollTop /> */}
        <div className="hero min-h-screen mb-48 relative">
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
          <div className="absolute left-0 bottom-6">
            <Tooltip placement="right" title="发现更多">
              <IconButton
                size="large"
                color="primary"
                onClick={() => {
                  const el = document.querySelector("#articleSection");
                  el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <SvgIcon className="animate-bounce" viewBox="0 0 1024 1024">
                  <path
                    d="M448 789.312V0h128v789.312l234.688-234.624L896 640l-384 384-384-384 85.312-85.312L448 789.312z"
                    fill="currentColor"
                    p-id="2204"
                  ></path>
                </SvgIcon>
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </Container>

      <Box id="articleSection" sx={{ mb: 48 }}>
        <ArticleSection />
      </Box>

      <Box id="momentSection" sx={{ mb: 48 }}>
        <MomentSection />
      </Box>

      <Box id="resourceSection" sx={{ mb: 32 }}>
        <ResourceSection />
      </Box>

      <Box id="articleCollectionSection" sx={{ mb: 16 }}>
        <ArticleCollectionSection />
      </Box>

      <Box id="resourceCollectionSection" sx={{ mb: 32 }}>
        <ResourceCollectionSection />
      </Box>

      <Box id="projectList" sx={{ mb: 32 }}>
        <ProjectList />
      </Box>
    </>
  );
};

export default Home;
