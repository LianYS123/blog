import React, { useRef } from "react";
import BraftEditor from "braft-editor";

import { controls, simpleControls } from "./config";
import { useHistory, useParams } from "react-router";
import { useMutation, useRequest } from "hooks";
import { Button, Form, Spin } from "@douyinfe/semi-ui";
import { parse } from "marked";
import routers from "routers";
import $ from "jquery";
import { useMedia } from "react-use";
import { BREAKPOINT } from "constants/index";
import {
  ADD_ARTICLE,
  EDIT_ARTICLE,
  GET_ARTICLE_DETAIL
} from "services/article";
import { CommonEditor } from "components/editor/CommonEditor";
import { useEditorState } from "components/editor/CommonEditor";
import { getSummary } from "utils";
import { Paper } from "@material-ui/core";
import { pick } from "lodash";
import { useEffect } from "react";
import _ from "lodash";

function Editor() {
  const formApiRef = useRef();
  const history = useHistory();
  const { id } = useParams();

  const isEdit = !!id;

  // 请求文章数据
  const { loading, data } = useRequest({
    service: GET_ARTICLE_DETAIL,
    necessaryParams: { id },
    ready: !!id
  });

  useEffect(() => {
    if (!_.isEmpty(data)) {
      const initValues = pick(data, ["articleName"]);
      formApiRef.current.setValues(initValues);
    }
  }, [data]);

  // 新增/修改文章
  const [load] = useMutation(id ? EDIT_ARTICLE : ADD_ARTICLE, null, {
    autoHandleError: true
  });

  // 是否是电脑端
  const isSM = useMedia(BREAKPOINT.sm);

  // 编辑器状态操作
  const { reset, isEmpty, getParams, ...editorProps } = useEditorState({
    record: data
  });

  // 保存文章
  const handleSubmit = async values => {
    if (isEmpty()) {
      return;
    }
    const params = getParams();
    const { html } = params;

    // 自动提取文章第一张图片作为封面
    const $html = $(html);
    const src = $html.find("img").attr("src");
    if (src) {
      params.cover = src;
    }
    params.summary = getSummary($html.text());

    const { success, data } = await load({ ...values, ...params });
    if (success) {
      history.push(routers.ARTICLE_LIST);
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
          title: "自动解析 .md 文章",
          text: "Markdown",
          onClick: handleConvert
        }
      ]
    : [];

  const cs = isSM ? controls : simpleControls;

  return (
    <div className="container h-full">
      <Spin className="h-full" spinning={loading}>
        <Form
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
        </Form>
        <Paper>
          <CommonEditor
            {...editorProps}
            // contentStyle={{ height: 160 }}
            isEdit={isEdit}
            showCancelButton={isEdit}
            onSubmit={() => formApiRef.current.submitForm()}
            controls={cs}
            extendControls={extendControls}
            onCancel={() => {
              history.goBack();
            }}
          />
        </Paper>
      </Spin>
    </div>
  );
}

export default Editor;
