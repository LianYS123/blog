import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import { useRequest, useUpSM } from "hooks";
import { GET_ARTICLE_DETAIL } from "services/article";
import { Container, Typography } from "@mui/material";

import { AppTitle } from "components/appTitle";
import { useWindowScroll } from "react-use";
import { DetailDialog } from "./DetailDialog";
import { DialActions } from "./DialActions";
import { SkeletonList } from "components/skeleton";
import { useLocation } from "react-router-dom";
import { renderOutline } from "./utils";
// import { MarkdownViewer } from "components/editor/MarkdownEditor";
import { Box } from "@mui/system";
import { Outline } from "./Outline";
import { useAppTitle } from "hooks/app";
import { useTiptapEditor } from "components/editor/tiptap";
import { EditorContent } from "@tiptap/react";
import mediumZoom from "medium-zoom";

import { marked } from "marked";

const TiptapViewer = ({ content }) => {
  const editor = useTiptapEditor({ editable: false, content });
  return <EditorContent editor={editor} />;
};

/**
 * 文章详情
 */
function Detail() {
  useAppTitle();
  const { id: resourceId } = useParams(); // 文章id
  const [infoVisible, setVisible] = useState(false); // 文章详情Dialog
  const { y } = useWindowScroll();
  const location = useLocation();

  // 请求文章详情
  const { data = {}, isLoading } = useRequest({
    service: GET_ARTICLE_DETAIL,
    params: { id: resourceId },
    ready: !!resourceId && resourceId !== "undefined"
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
  const upSM = useUpSM();
  const isRich = !contentType || contentType === "RICH";
  const tagArr = tags ? tags.split("|") : [];
  const [outline, setOutline] = useState([]);
  const [content, setContent] = useState();

  const isNotEmpty = () => {
    if (isRich) {
      return !!data?.html;
    } else {
      return !!data?.markdownContent;
    }
  };

  useEffect(() => {
    if (isNotEmpty()) {
      const _html = isRich ? html : marked(markdownContent);
      const tpl = document.createElement("template");
      tpl.innerHTML = _html;
      // 将 p 标签下的 img 标签拆出来
      tpl.content.querySelectorAll("p > img").forEach(el => {
        const p = el.parentElement;
        p.parentNode.insertBefore(el, p);
        p.remove();
      });
      const elements = tpl.content.querySelectorAll("h1,h2,h3,h4"); // 必须使用模板的 content 查询子内容
      const outline = renderOutline(elements);
      setOutline(outline);
      setContent(tpl.innerHTML);

      setTimeout(() => {
        const el = document.querySelector(".ProseMirror");
        if (el) {
          // id 会被 tiptap 忽略，在这里加上
          renderOutline(el.querySelectorAll("h1, h2, h3, h4"));
          // 添加缩放功能
          mediumZoom(el.querySelectorAll("img"));
        }
      }, 100);
    }
  }, [contentType, markdownContent, html]);

  // const empty = !isNotEmpty();

  return (
    <Container sx={{ pb: 4 }}>
      <AppTitle
        title={y < 36 ? "" : articleName || "文章详情"}
        back={location?.state?.path || true}
      />

      <SkeletonList loading={isLoading} />
      {/* 标题 */}
      <Typography variant="h3" component="h1" sx={{ mt: 2, mb: 4.5 }}>
        {articleName}
      </Typography>

      {isNotEmpty() ? (
        <>
          <Box sx={{ display: "flex", justifyItems: "start" }}>
            {/* 文章内容 */}
            <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
              <TiptapViewer content={content} />
            </Box>
            {/* 导航 */}
            {upSM && outline.length ? (
              <Box sx={{ minWidth: 128, ml: 2, position: "relative" }}>
                <Box sx={{ position: "fixed" }}>
                  <Outline outline={outline} />
                </Box>
              </Box>
            ) : null}
          </Box>
        </>
      ) : isLoading ? null : (
        "暂无数据"
      )}
      {/* 快速拨号操作栏 */}
      <DialActions visible={infoVisible} setVisible={setVisible} {...data} />

      {/* 文章详情 */}
      <DetailDialog visible={infoVisible} setVisible={setVisible} {...data} />
    </Container>
  );
}

export default Detail;
