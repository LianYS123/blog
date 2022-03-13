import { Editor, Viewer } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { upload } from "utils/fetch";
import { useSnackbar } from "notistack";
import zhHans from "bytemd/lib/locales/zh_Hans.json";

const plugins = [gfm(), highlight()];

export const MarkdownViewer = props => {
  return <Viewer plugins={plugins} {...props} />;
};

/**
 * Markdown 编辑器
 */
export const MarkdownEditor = props => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Editor
      {...props}
      plugins={plugins}
      locale={zhHans}
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
