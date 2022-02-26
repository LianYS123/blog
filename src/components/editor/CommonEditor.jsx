import React from "react";

import BraftEditor from "braft-editor";
import { FILE_PREVIEW } from "services/app";
import { upload } from "utils/fetch";

// 带请求逻辑的富文本编辑器封装
export const CommonEditor = props => {
  return (
    <div>
      <BraftEditor
        media={{
          accepts: { audio: true, video: true },
          async uploadFn({ success, error, file }) {
            const res = await upload(file);
            const { data: url } = res;
            // const url = `${FILE_PREVIEW}?id=${fileId}`;
            if (res.success && url) {
              success({
                url,
                meta: {
                  //
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
    </div>
  );
};
