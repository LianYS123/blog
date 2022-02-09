import React from "react";
import BraftEditor from "braft-editor";

import { simpleControls } from "./config";
import { withField } from "@douyinfe/semi-ui";
import { upload } from "utils/fetch";
import { FILE_PREVIEW } from "services/app";

export function Editor({ ...props }) {
  return (
    <BraftEditor
      controls={simpleControls}
      media={{
        accepts: { audio: true, video: true },
        async uploadFn({ success, error, file }) {
          const res = await upload(file);
          const { data: fileId } = res;
          const url = `${FILE_PREVIEW}?id=${fileId}`;
          if (res.success && url) {
            success({
              url,
              meta: {
                id: url,
                title: url,
                alt: url,
                loop: false, // 指定音视频是否循环播放
                autoPlay: false, // 指定音视频是否自动播放
                controls: false // 指定音视频是否显示控制栏
                // poster: 'http://xxx/xx.png', // 指定视频播放器的封面
              }
            });
          } else {
            error({
              msg: "unable to upload."
            });
          }
        }
      }}
      {...props}
    />
  );
}

export const EditorField = withField(Editor);
