import React, { useRef } from "react";
import BraftEditor from "braft-editor";

import { controls, simpleControls } from "./config";
import { useHistory, useParams } from "react-router";
import { useMutation, useRequest } from "hooks";
import { Button, Form, Spin, Tag } from "@douyinfe/semi-ui";
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
import { Paper } from "@mui/material";
import { cloneDeep, pick } from "lodash";
import { useEffect } from "react";
import _ from "lodash";
import { GET_ALL_TAGS } from "services/tag";

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

  // 请求可选标签
  const { data: allTags = [] } = useRequest({
    service: GET_ALL_TAGS,
    initialData: []
  });

  const tagColorMap = allTags.reduce(
    (res, cur) => ({ ...res, [cur.tagName]: cur.tagColor }),
    {}
  );

  // 编辑器状态操作
  const { reset, isEmpty, getParams, ...editorProps } = useEditorState({
    record: data
  });

  // 初始化表单
  useEffect(() => {
    if (!_.isEmpty(data)) {
      const { tags } = data;
      const initValues = pick(data, ["articleName"]);
      if (!_.isEmpty(tags)) {
        initValues.tags = tags.split("|");
      }
      formApiRef.current.setValues(initValues);
    }
  }, [data]);

  // 新增/修改文章
  const [load] = useMutation(id ? EDIT_ARTICLE : ADD_ARTICLE, null, {
    autoHandleError: true,
    successMessage: isEdit ? "文章修改成功" : "文章发布成功"
  });

  // 是否是电脑端
  const isSM = useMedia(BREAKPOINT.sm);

  // 保存文章
  const handleSubmit = async _values => {
    const values = cloneDeep(_values);
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

    // if (!isEmpty(values.tags)) {
    //   // 为标签指定颜色
    //   values.tags = values.tags.join("|");
    // }

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
          className="md:flex"
          getFormApi={formApi => (formApiRef.current = formApi)}
          onSubmit={handleSubmit}
        >
          {/* 文章标题 */}
          <div className="flex-auto md:mr-2">
            <Form.Input
              size="large"
              field="articleName"
              noLabel
              placeholder="请输入标题"
              rules={[{ required: true }]}
            />
          </div>
          {/* 标签 */}
          <div className="w-full md:w-64">
            <Form.TagInput
              className="w-full"
              field="tags"
              multiple
              noLabel
              size={"large"}
              placeholder="请选择标签"
            />
          </div>
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
