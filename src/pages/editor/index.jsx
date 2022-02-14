import React, { useEffect, useState } from "react";
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
  IconButton,
  Paper,
  SvgIcon,
  TextField,
  Tooltip
} from "@mui/material";
import _ from "lodash";
import { AppTitle } from "components/appTitle";

function Editor() {
  const history = useHistory();
  const { id } = useParams();

  const [articleName, setArticleName] = useState("");
  const [tags, setTags] = useState([]);
  const [visible, setVisible] = useState(false); // 是否显示编辑标签弹出框

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
    if (isEmpty()) {
      return;
    }
    const { value: editorState, onChange: setState } = editorProps;
    const text = editorState.toText();
    const html = parse(text);
    setState(BraftEditor.createEditorState(html));
  };

  const extendControls = isSM
    ? [
        "separator",
        {
          key: "md",
          type: "component",
          component: (
            <div className="w-9 h-9 flex items-end">
              <Tooltip arrow title="自动解析 .md 文章">
                <IconButton
                  style={{ transform: "translateY(-2px)" }}
                  onClick={handleConvert}
                >
                  <SvgIcon fontSize="small">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1024 1024"
                    >
                      <path
                        fill="#DFDFF2"
                        d="M0 686.081a332.799 332.799 0 10665.598 0 332.799 332.799 0 10-665.598 0z"
                      ></path>
                      <path
                        fill="#434260"
                        d="M883.197 1024H243.2a141.056 141.056 0 01-140.8-140.8V140.803A141.056 141.056 0 01243.2.003h516.35a89.088 89.088 0 0163.233 25.6l189.695 189.695a38.4 38.4 0 0111.52 27.904V883.2a141.056 141.056 0 01-140.8 140.8zM243.2 76.803a64 64 0 00-64 64V883.2a64 64 0 0064 64h639.998a64 64 0 0064-64V259.074l-179.2-179.2a12.8 12.8 0 00-8.447-3.071z"
                      ></path>
                      <path
                        fill="#434260"
                        d="M354.559 399.106h40.96l41.216 112.896c5.12 15.103 9.728 30.463 15.104 45.823h1.536c5.12-15.36 9.472-30.72 14.848-45.823l40.96-114.176h41.215v226.047h-33.536V512.002c0-20.224 2.816-49.408 4.608-69.888l-18.176 51.2-39.423 107.775h-22.016l-39.68-107.775-17.92-51.2c1.536 20.48 4.352 49.664 4.352 69.888v111.871h-34.048zm254.975 0h58.624c69.376 0 109.056 38.4 109.056 112.128s-39.68 113.92-107.264 113.92h-60.416zm56.064 196.607c48.384 0 74.496-28.672 74.496-84.735s-25.6-83.2-74.496-83.2h-20.48v167.935z"
                      ></path>
                    </svg>
                  </SvgIcon>
                </IconButton>
              </Tooltip>
            </div>
          )
          // text: "Markdown",
          // onClick: handleConvert
        }
      ]
    : [];

  const cs = isSM ? controls : simpleControls;

  return (
    <div>
      <AppTitle title={isEdit ? "编辑文章" : "写文章"} back={true} />
      <div className="container h-full pt-14">
        <Spin className="h-full" spinning={loading}>
          <div className="space-y-2 my-2">
            {/* 文章标题 */}
            <div>
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
            </div>

            {/* 标签 */}
            <div className="space-x-1 space-y-1">
              {(tags || []).map(tag => {
                return (
                  <Chip
                    size="small"
                    onDelete={() => setTags(tags.filter(t => t !== tag))}
                    label={tag}
                    key={tag}
                  />
                );
              })}
              <Button onClick={() => setVisible(true)}>编辑文章标签</Button>
            </div>

            {/* 编辑标签弹出框 */}
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
                      <Chip
                        size="small"
                        label={option}
                        {...getTagProps({ index })}
                      />
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

          {/* 文章内容编辑器 */}
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
    </div>
  );
}

export default Editor;
