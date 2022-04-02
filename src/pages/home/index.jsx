import { Container, Typography } from "@mui/material";
import React from "react";
import AppHeader from "layout/header";
import { AppFooter } from "layout/footer";
import { useTitle } from "react-use";
import { ProjectList } from "./ProjectList";
import { Box } from "@mui/system";

const Home = () => {
  useTitle("Liam's Blog");

  return (
    <>
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
      </Container>

      <Box>
        <ProjectList />
      </Box>

      <Container>
        <AppFooter />
      </Container>
    </>
  );
};

export default Home;
