import React, { useRef } from "react";
import BraftEditor from "braft-editor";

import { controls, simpleControls } from "./config";
import { useArticle } from "./hooks";
import { useHistory, useParams } from "react-router";
import { useMutation } from "hooks";
import { Button, Form, Spin } from "@douyinfe/semi-ui";
import { parse } from "marked";
import routers from "routers";
import $ from "jquery";
import { useMedia } from "react-use";
import { BREAKPOINT } from "constants/index";
import { ADD_ARTICLE, EDIT_ARTICLE } from "services/article";
import { EditorField } from "components/editor";

function Editor() {
  const formApiRef = useRef();
  const history = useHistory();
  const { id } = useParams();
  const { loading } = useArticle({ formApi: formApiRef, id });
  const [load] = useMutation(id ? EDIT_ARTICLE : ADD_ARTICLE);

  const isSM = useMedia(BREAKPOINT.sm);

  // 保存文章
  const handleSubmit = async values => {
    const { editorState, ...rest } = values;
    const html = editorState.toHTML();
    const raw = editorState.toRAW();

    // 自动提取文章第一张图片作为封面
    const src = $(html).find("img").attr("src");
    if (src) {
      rest.cover = src;
    }

    const requestParams = { html, raw, ...rest };
    const { success, data } = await load({ ...requestParams, id });
    if (success) {
      history.push(routers.DETAIL.replace(":id", data));
    }
  };

  // 转换markdown
  const handleConvert = () => {
    const editorState = formApiRef.current.getValue("editorState");
    if (!editorState) {
      return;
    }
    const text = editorState.toText();
    // console.log(text);
    const html = parse(text);
    const editor = BraftEditor.createEditorState(html);
    formApiRef.current.setValue("editorState", editor);
  };

  const extendControls = isSM
    ? [
        "separator",
        {
          key: "my-button",
          type: "button",
          title: "自动解析markdown文章",
          text: "markdown",
          onClick: handleConvert
        }
      ]
    : [];

  return (
    <div className="container h-full">
      <Spin className="h-full" spinning={loading}>
        <Form
          className="h-full"
          labelPosition="left"
          getFormApi={formApi => (formApiRef.current = formApi)}
          onSubmit={handleSubmit}
        >
          {/* 文章标题 */}
          <Form.Input
            size="large"
            className="w-full"
            field="articleName"
            noLabel
            placeholder="请输入标题"
            rules={[{ required: true }]}
          />

          {/* 文章内容 */}
          <EditorField
            noLabel={true}
            field="editorState"
            placeholder={
              id
                ? "按 Ctrl + S / Command + S 保存"
                : "按 Ctrl + S / Command + S 发布"
            }
            controls={isSM ? controls : simpleControls}
            extendControls={extendControls}
          />
          <div className="text-center space-x-2 pb-4">
            <Button size="large" theme="solid" htmlType="submit">
              保存
            </Button>
            <Button size="large" onClick={history.goBack}>
              返回
            </Button>
          </div>
        </Form>
      </Spin>
    </div>
  );
}

export default Editor;
