import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useAppTitle } from "hooks/app";

export default function About() {
  useAppTitle();
  return (
    <Container>
      <Grid sx={{ mt: 8 }} container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4">记录技术、生活和有趣的事</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" fontWeight={400} color="text.secondary">
            {/* 记录生活。我要如何生活？我会如何生活？
            记录知识。从技术到学科，记录我感兴趣的知识。
            记录心情。走在路上，心情和情感不断起伏，想把这些变化记录下来。
            记录想法。过多的想法使人孤独，而它却又是一切主观创造的原料。 */}
            这是我个人维护的一个空间，是我一直以来的一些想法的实现。我把一些技术和总结放在这里，有时也会有一些想法和心情。
            <br />
            我希望它可以是一个以文字内容为主体的社区，有专属于文字的风格和感觉，每一处都是记述和表达。
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ mt: 6 }}>
        <img
          className="w-full"
          src="https://blog-1259462774.cos.ap-shanghai.myqcloud.com/illustrations/%E4%BF%A1%E6%81%AF%E6%9C%8D%E5%8A%A1.svg"
        />
      </Box>
    </Container>
  );
}
