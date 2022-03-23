import { Box } from "@mui/material";
import { EditorContent } from "@tiptap/react";
import { useTiptapEditor } from "components/editor/tiptap";
import $ from "jquery";
import { marked } from "marked";
import { useEffect, useMemo } from "react";
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

  // useEffect(() => {
  //   if (!editor) {
  //     return;
  //   }
  //   if (convertContent) {
  //     const html = marked(convertContent);
  //     editor.setOptions({ content: html });
  //   } else if (data?.html) {
  //     editor.setOptions({ content: data.html });
  //   } else if (data?.markdownContent) {
  //     const html = marked(data.markdownContent);
  //     editor.setOptions({ content: html });
  //   }
  // }, [data, convertContent, editor]);

  // className="rounded border border-gray-500 dark:border-gray-300"
  return (
    <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
      <Box sx={{ height: "100%", overflow: "auto" }}>
        <EditorContent
          onClick={() => editor.commands.focus()}
          autoFocus
          style={{
            overflow: "auto"
            // padding: 16
          }}
          editor={editor}
        />
      </Box>
    </Box>
  );
};
