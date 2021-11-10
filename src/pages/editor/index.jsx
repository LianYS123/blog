import React, { useRef, useState } from "react";
import BraftEditor from "braft-editor";

import { fontFamilies } from "./config";
import { useArticle } from "./hooks";
import { useHistory, useParams } from "react-router";
import { useMutation, useRequest } from "hooks";
import {
  ADD_ARTICLE,
  EDIT_ARTICLE,
  GET_ALL_TAGS,
  IMAGE_UPLOAD
} from "services/API";
import { Button, Form, Spin, withField } from "@douyinfe/semi-ui";
import { IconUpload } from "@douyinfe/semi-icons";
import { upload } from "utils/fetch";
import { parse } from "marked";
import routers from "routers";
import $ from "jquery";

function Editor() {
  const formApiRef = useRef();
  const history = useHistory();
  const { id } = useParams();
  const { loading } = useArticle({ formApi: formApiRef, id });
  const [load] = useMutation(id ? EDIT_ARTICLE : ADD_ARTICLE);
  const [loadingConvert, setLoadingConvert] = useState(false);
  const { data: tags } = useRequest({
    service: GET_ALL_TAGS,
    initialData: []
  });

  // 保存文章
  const handleSubmit = async values => {
    const { editorState, cover: files = [], ...rest } = values;
    const html = editorState.toHTML();
    const raw = editorState.toRAW();
    const file = files[0];
    const src = $(html).find("img").attr("src");
    if (src) {
      rest.cover = src;
    }

    if (file?.response?.code === "0000") {
      const { data } = file.response;
      rest.cover = data;
    }

    const requestParams = { html, raw, ...rest };
    const { code, data } = await load({ ...requestParams, id });
    if (code === "0000") {
      // history.goBack();
      history.push(routers.DETAIL.replace(":id", data));
    }
  };

  // 转换markdown
  const handleConvert = () => {
    setLoadingConvert(true);
    try {
      const editorState = formApiRef.current.getValue("editorState");
      if (!editorState) {
        setLoadingConvert(false);
        return;
      }
      const text = editorState.toText();
      // console.log(text);
      const html = parse(text);
      const editor = BraftEditor.createEditorState(html);
      formApiRef.current.setValue("editorState", editor);
    } finally {
      setLoadingConvert(false);
    }
  };

  const Editor = withField(BraftEditor);

  return (
    <div className="container">
      <Spin spinning={loading || loadingConvert}>
        <Form
          labelPosition="left"
          getFormApi={formApi => (formApiRef.current = formApi)}
          onSubmit={handleSubmit}
        >
          <div className="flex space-x-8">
            <div className="flex-auto">
              <Form.Input
                size="large"
                className="w-full"
                field="articleName"
                noLabel
                placeholder="请输入标题"
                rules={[{ required: true }]}
              />
            </div>
            <Form.Select
              className="w-64"
              size="large"
              // label="文章标签"
              noLabel
              field="tags"
              multiple
              placeholder="请选择标签"
            >
              {tags.map(tag => (
                <Form.Select.Option value={tag.id} key={tag.id}>
                  {tag.tagName}
                </Form.Select.Option>
              ))}
            </Form.Select>
            <div className="text-right space-x-2 mt-4">
              <Button theme="solid" htmlType="submit">
                保存
              </Button>
              <Button onClick={history.goBack}>返回</Button>
            </div>
          </div>

          {/* <Form.Upload
            field="cover"
            label="封面"
            fileName="file"
            // listType="picture"
            headers={{ Authorization: localStorage.getItem("acc") }}
            limit={1}
            action={IMAGE_UPLOAD}
          >
            <Button icon={<IconUpload />} theme="light">
              点击上传
            </Button>
          </Form.Upload> */}

          {/* 文章内容 */}
          <Editor
            id="htmlTemplate"
            noLabel={true}
            field="editorState"
            // controls={controls}
            extendControls={[
              "separator",
              {
                key: "my-button",
                type: "button",
                title: "自动解析markdown文章",
                text: "markdown",
                onClick: handleConvert
              }
            ]}
            fontFamilies={fontFamilies}
            media={{
              accepts: { audio: true, video: true },
              async uploadFn({ success, error, file }) {
                const { code, data: url } = await upload(file);
                if (code === "0000" && url) {
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
          />
        </Form>
      </Spin>
    </div>
  );
}

export default Editor;
