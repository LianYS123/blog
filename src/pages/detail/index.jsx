import React, { useState } from "react";
import { Viewer } from "@bytemd/react";

import { useParams } from "react-router";
import { useRequest } from "hooks";
import { GET_ARTICLE_DETAIL } from "services/article";
import { Chip, Container, Typography } from "@mui/material";

import { AppTitle } from "components/appTitle";
import { useWindowScroll } from "react-use";
import { DetailDialog } from "./DetailDialog";
import { DialActions } from "./DialActions";
import { SkeletonList } from "components/skeleton";
import { useLocation } from "react-router-dom";
import { getHtmlAndOutline } from "./utils";
import { MarkdownViewer } from "components/editor/MarkdownEditor";

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

  return (
    <Container sx={{ pb: 4 }}>
      <AppTitle
        title={y < 36 ? "" : articleName || "文章详情"}
        back={location?.state?.path || true}
      />
      <SkeletonList loading={loading} />

      <Typography variant="h4" gutterBottom>
        {articleName}
      </Typography>

      {isRich ? (
        <article
          id="htmlTemplate"
          dangerouslySetInnerHTML={{ __html: html }}
        ></article>
      ) : (
        <MarkdownViewer value={markdownContent} />
      )}
      <DialActions visible={infoVisible} setVisible={setVisible} {...data} />
      <DetailDialog visible={infoVisible} setVisible={setVisible} {...data} />
    </Container>
  );
}

export default Detail;
