import React from "react";
import BraftEditor from "braft-editor";

import { fontFamilies, simpleControls } from "./config";
import { withField } from "@douyinfe/semi-ui";
import { upload } from "utils/fetch";

export function Editor({ ...props }) {
  return (
    <BraftEditor
      controls={simpleControls}
      fontFamilies={fontFamilies}
      media={{
        accepts: { audio: true, video: true },
        async uploadFn({ success, error, file }) {
          const res = await upload(file);
          const { data: url } = res;
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
