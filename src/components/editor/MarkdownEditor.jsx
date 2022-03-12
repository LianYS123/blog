import { Editor, Viewer } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { upload } from "utils/fetch";
import { useSnackbar } from "notistack";
import "bytemd/dist/index.min.css";
import "github-markdown-css/github-markdown-light.css";
import "highlight.js/styles/default.css";

const plugins = [
  gfm(),
  highlight()
  // Add more plugins here
];

/**
 * Markdown 编辑器
 */
export const MarkdownEditor = props => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Editor
      className="markdown-body"
      plugins={plugins}
      {...props}
      uploadImages={async files => {
        if (files && files.length) {
          const res = await upload(files[0]);
          const { data: url, success, message } = res;
          if (success) {
            return [{ url, alt: "img", title: "" }];
          } else {
            enqueueSnackbar(message || "图片上传失败", {
              variant: "error"
            });
          }
        }
      }}
    />
  );
};
