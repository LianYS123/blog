import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useMutation, useRequest } from "hooks";
import { Spin } from "@douyinfe/semi-ui";
import routers from "routers";
import {
  ADD_ARTICLE,
  EDIT_ARTICLE,
  GET_ARTICLE_DETAIL
} from "services/article";
import { Button, TextField } from "@mui/material";
import _ from "lodash";
import { AppTitle } from "components/appTitle";
import { TagSelector } from "./TagSelector";
import { RichEditor } from "./RichEditor";

function Editor() {
  const history = useHistory();
  const { id } = useParams();
  const isEdit = !!id;

  const [articleName, setArticleName] = useState("");
  const [tags, setTags] = useState([]);

  // 请求文章数据
  const { loading, data } = useRequest({
    service: GET_ARTICLE_DETAIL,
    necessaryParams: { id },
    ready: !!id
  });

  // 初始化表单
  useEffect(() => {
    if (!_.isEmpty(data)) {
      const { tags, articleName } = data;
      if (articleName) {
        setArticleName(articleName);
      }
      if (tags) {
        setTags(tags.split("|"));
      }
    }
  }, [data]);

  // 新增/修改文章
  const [load] = useMutation(id ? EDIT_ARTICLE : ADD_ARTICLE, null, {
    autoHandleError: true
    // successMessage: isEdit ? "文章修改成功" : "文章发布成功"
  });

  const getParamsFnRef = useRef();

  // 保存文章
  const handleSubmit = async () => {
    const params = getParamsFnRef.current();
    if (!params) {
      return;
    }
    const { success, data } = await load({ ...params, articleName, tags });
    if (success) {
      if (isEdit) {
        history.goBack();
      } else {
        // 如果是新增，跳转到文章详情页，并保证再次返回会回到文章列表页
        history.push(routers.DETAIL.replace(":id", data), {
          path: routers.ARTICLE_LIST
        });
      }
    }
  };

  return (
    <div>
      <AppTitle
        title={isEdit ? "编辑文章" : "写文章"}
        back={true}
        extra={<Button onClick={handleSubmit}>发布</Button>}
      />
      <div className="container pt-14">
        <Spin spinning={loading}>
          {/* 文章标题 */}
          <TextField
            variant="standard"
            size="small"
            value={articleName}
            onChange={ev => setArticleName(ev.target.value)}
            name="articleName"
            fullWidth
            label="文章标题"
            placeholder="请输入文章标题"
          />

          {/* 标签 */}
          <TagSelector tags={tags} setTags={setTags} />

          {/* 文章内容编辑器 */}
          <RichEditor
            isEdit={isEdit}
            data={data}
            getParamsFnRef={getParamsFnRef}
          />
        </Spin>
      </div>
    </div>
  );
}

export default Editor;
