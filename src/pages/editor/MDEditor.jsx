import { MarkdownEditor } from "components/editor/MarkdownEditor";
import { useEffect, useState } from "react";
import $ from "jquery";
import { parse } from "marked";
import { getRQualityImage, getSummary } from "utils";
import { Box, Paper } from "@mui/material";
import "./styles.less";

/**
 * Markdown 编辑器
 */
export const MDEditor = ({ isEdit, data, getParamsFnRef }) => {
  const [value, onChange] = useState("");
  useEffect(() => {
    if (data?.markdownContent) {
      onChange(data.markdownContent);
    }
  }, [data]);

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
    <Box className="markdown-editor" component={"div"} sx={{ flexGrow: 1 }}>
      <MarkdownEditor value={value} onChange={onChange} />
    </Box>
  );
};
