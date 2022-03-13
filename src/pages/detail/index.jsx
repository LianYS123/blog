import React, { useEffect, useState } from "react";
import { Viewer } from "@bytemd/react";

import { useParams } from "react-router";
import { useRequest } from "hooks";
import { GET_ARTICLE_DETAIL } from "services/article";
import { Chip, Container, Typography, useMediaQuery } from "@mui/material";

import { AppTitle } from "components/appTitle";
import { useWindowScroll } from "react-use";
import { DetailDialog } from "./DetailDialog";
import { DialActions } from "./DialActions";
import { SkeletonList } from "components/skeleton";
import { useLocation } from "react-router-dom";
import { getHtmlAndOutline, renderOutline } from "./utils";
import { MarkdownViewer } from "components/editor/MarkdownEditor";
import { Box, useTheme } from "@mui/system";
import { Outline } from "./Outline";

/**
 * 文章详情
 */
function Detail() {
  const { id: resourceId } = useParams(); // 文章id
  const [infoVisible, setVisible] = useState(false); // 文章详情Dialog
  const { y } = useWindowScroll();
  const location = useLocation();

  // 请求文章详情
  const { data, loading } = useRequest({
    service: GET_ARTICLE_DETAIL,
    necessaryParams: { id: resourceId },
    ready: !!resourceId && resourceId !== "undefined",
    initialData: { html: "" }
  });
  const {
    articleName,
    authorId,
    id,
    tags,
    contentType,
    markdownContent,
    html
  } = data;
  const isRich = !contentType || contentType === "RICH";
  const tagArr = tags ? tags.split("|") : [];
  const [outline, setOutline] = useState([]);
  useEffect(() => {
    if (contentType === null || contentType === "RICH") {
      const el = document.querySelector("#htmlTemplate");
      const outline = renderOutline(el);
      setOutline(outline);
    } else if (contentType === "MD") {
      const el = document.querySelector(".markdown-body");
      const outline = renderOutline(el);
      setOutline(outline);
    }
  }, [contentType]);
  const theme = useTheme();
  const upSM = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Container sx={{ pb: 4 }}>
      <AppTitle
        title={y < 36 ? "" : articleName || "文章详情"}
        back={location?.state?.path || true}
      />
      <SkeletonList loading={loading} />

      {/* 标题 */}
      <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
        {articleName}
      </Typography>
      <Box sx={{ display: "flex", justifyItems: "start" }}>
        {/* 文章内容 */}
        <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
          {isRich ? (
            <article
              id="htmlTemplate"
              dangerouslySetInnerHTML={{ __html: html }}
            ></article>
          ) : (
            <MarkdownViewer value={markdownContent} />
          )}
        </Box>
        {/* 导航 */}
        {upSM && outline.length ? (
          <Box sx={{ minWidth: 200, ml: 2, position: "relative" }}>
            <Box sx={{ position: "fixed" }}>
              <Outline outline={outline} />
            </Box>
          </Box>
        ) : null}
      </Box>

      {/* 快速拨号操作栏 */}
      <DialActions visible={infoVisible} setVisible={setVisible} {...data} />

      {/* 文章详情 */}
      <DetailDialog visible={infoVisible} setVisible={setVisible} {...data} />
    </Container>
  );
}

export default Detail;
