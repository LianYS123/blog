import React, { useRef } from "react";
import BraftEditor from "braft-editor";

import "braft-editor/dist/index.css";
import { controls, fontFamilies } from "./config";
import { useArticle } from "./hooks";
import { useHistory, useLocation } from "react-router";
import { useMutation } from "hooks";
import { ADD_ARTICLE, EDIT_ARTICLE } from "services/API";
import qs from "query-string";
import { Button, Form, Spin, withField } from "@douyinfe/semi-ui";

const useQuery = () => {
  const location = useLocation();
  return qs.parse(location.search);
};

function Editor() {
  const api = useRef();
  const form = api.current;
  const { loading } = useArticle({ form });
  const history = useHistory();
  const { id } = useQuery();
  const [updateArticle] = useMutation(EDIT_ARTICLE);
  const [addArticle] = useMutation(ADD_ARTICLE);

  // 保存文章
  const handleSubmit = async values => {
    const { editorState, ...rest } = values;
    const html = editorState.toHTML();
    const raw = editorState.toRAW();

    const requestParams = { html, raw, ...rest };
    const request = id ? updateArticle : addArticle;
    await request(requestParams);
    // console.log(requestParams);
  };

  const Editor = withField(BraftEditor);

  return (
    <div className="mx-auto py-8">
      <Spin spinning={loading}>
        <Form
          getFormApi={formApi => (api.current = formApi)}
          onSubmit={handleSubmit}
        >
          <Form.Input
            className="w-72"
            label="标题"
            placeholder="请输入标题"
            rules={[{ required: true }]}
          />

          {/* 文章内容 */}
          <Editor
            controls={controls}
            fontFamilies={fontFamilies}
            // media={ {accepts: { audio:true,video:true} } }
          />

          <div className="text-center space-x-4">
            <Button type="primary" htmlType="submit">
              保存
            </Button>
            <Button type="default" onClick={() => history.go(-1)}>
              返回
            </Button>
          </div>
        </Form>
      </Spin>
    </div>
  );
}

export default Editor;
