import React, { useRef, useEffect, useState } from "react";
import BraftEditor from "braft-editor";

import { allTags, controls, simpleControls } from "./config";
import { useHistory, useParams } from "react-router";
import { useMutation, useRequest } from "hooks";
import { Spin } from "@douyinfe/semi-ui";
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
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TextField
} from "@mui/material";
import _ from "lodash";

function Editor() {
  const formApiRef = useRef();
  const history = useHistory();
  const { id } = useParams();

  const [articleName, setArticleName] = useState("");
  const [tags, setTags] = useState([]);
  const [visible, setVisible] = useState(); // 是否显示编辑标签弹出框

  const isEdit = !!id;

  // 请求文章数据
  const { loading, data } = useRequest({
    service: GET_ARTICLE_DETAIL,
    necessaryParams: { id },
    ready: !!id
  });

  // 编辑器状态操作
  const { reset, isEmpty, getParams, ...editorProps } = useEditorState({
    record: data
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
    autoHandleError: true,
    successMessage: isEdit ? "文章修改成功" : "文章发布成功"
  });

  // 是否是电脑端
  const isSM = useMedia(BREAKPOINT.sm);

  // 保存文章
  const handleSubmit = async () => {
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

    const { success, data } = await load({ ...params, articleName, tags });
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
        <div className="space-y-2 my-2">
          <div>
            <TextField
              variant="standard"
              size="small"
              value={articleName}
              onChange={setArticleName}
              name="articleName"
              fullWidth
              label="文章标题"
              placeholder="请输入文章标题"
            />
          </div>
          <div className="space-x-1 space-y-1">
            {(tags || []).map(tag => {
              return (
                <Chip
                  onDelete={() => setTags(tags.filter(t => t !== tag))}
                  label={tag}
                  key={tag}
                />
              );
            })}
            <Button onClick={() => setVisible(true)}>编辑文章标签</Button>
            {/* <IconButton onClick={() => setVisible(true)}>
              <Edit />
            </IconButton> */}
          </div>
          <Dialog open={visible} onClose={() => setVisible(false)}>
            <DialogTitle>编辑标签</DialogTitle>
            <DialogContent>
              <DialogContentText>
                选择常用标签或输入自定义标签，输入自定义标签后按回车添加
              </DialogContentText>
              <Autocomplete
                size="small"
                value={tags}
                onChange={(ev, value) => {
                  setTags(value);
                }}
                multiple
                freeSolo
                fullWidth
                options={allTags}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={params => (
                  <TextField
                    {...params}
                    margin="dense"
                    variant="standard"
                    label="标签"
                    placeholder="选择或输入标签"
                  />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setVisible(false)}>确认</Button>
            </DialogActions>
          </Dialog>
        </div>
        <Paper>
          <CommonEditor
            {...editorProps}
            isEdit={isEdit}
            showCancelButton={isEdit}
            onSubmit={handleSubmit}
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
