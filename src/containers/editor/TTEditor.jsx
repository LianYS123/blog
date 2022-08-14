import { Box } from "@mui/material";
import { EditorContent } from "@tiptap/react";
import { useTiptapEditor } from "components/editor/tiptap";
import { TipTapMenubar } from "components/editor/tiptap/TipTapMenubar";
import $ from "jquery";
import { marked } from "marked";
import { useMemo } from "react";
import { getRQualityImage, getSummary } from "utils";

export const TTEditor = props => {
  const { isEdit, data, getParamsFnRef, convertContent } = props;
  const content = useMemo(() => {
    if (convertContent) {
      // 移除包裹在img外的p标签
      const $html = $(`<div>${marked(convertContent)}</div>`);
      $html.find("img").unwrap("p");
      // console.log($html.html());
      return $html.html();
      // return html;
    } else {
      return data?.html;
    }
  }, [data, convertContent]);

  const editor = useTiptapEditor({
    content,
    placeholder: "请输入正文..."
  });

  // 父组件获取参数的方法
  getParamsFnRef.current = () => {
    const params = {};
    const html = editor.getHTML();
    const $html = $(`<div>${html}</div>`);
    const src = $html.find("img").attr("src");
    if (src) {
      params.cover = getRQualityImage(src);
    }
    params.summary = getSummary($html.text());
    params.html = html;
    return params;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {editor && <TipTapMenubar editor={editor} />}
      <EditorContent
        onClick={() => editor.commands.focus()}
        autoFocus
        editor={editor}
      />
    </Box>
  );
};
