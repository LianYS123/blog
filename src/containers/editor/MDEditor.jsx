import { MarkdownEditor } from "components/editor/MarkdownEditor";
import { useEffect, useState } from "react";
import $ from "jquery";
import { parse } from "marked";
import { getRQualityImage, getSummary } from "utils";
import { Box, Paper } from "@mui/material";
import "./styles.less";
import TurndownService from "turndown";

const turndownService = new TurndownService();

/**
 * Markdown 编辑器
 */
export const MDEditor = ({ isEdit, data, getParamsFnRef, convertContent }) => {
  const [value, onChange] = useState("");
  useEffect(() => {
    // if (convertContent) {
    //   const md = turndownService.turndown(convertContent);
    //   onChange(md);
    // } else
    if (data?.markdownContent) {
      onChange(data.markdownContent);
    } else if (data?.html) {
      const md = turndownService.turndown(data?.html);
      onChange(md);
    }
  }, [data, convertContent]);

  getParamsFnRef.current = () => {
    const params = {
      markdownContent: value
    };
    const html = parse(value);
    const $html = $(html);
    const src = $html.find("img").attr("src");
    if (src) {
      params.cover = getRQualityImage(src);
    }
    params.summary = getSummary($html.text());
    return params;
  };

  return (
    <Box
      className="markdown-editor"
      component={"div"}
      sx={{ flexGrow: 1, overflow: "hidden" }}
    >
      <MarkdownEditor value={value} onChange={onChange} />
    </Box>
  );
};
