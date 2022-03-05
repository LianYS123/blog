import React, { useEffect, useState } from "react";
import BraftEditor from "braft-editor";

import { controls, simpleControls } from "./config";
import { useHistory, useParams } from "react-router";
import { useMutation, useRequest } from "hooks";
import { Spin } from "@douyinfe/semi-ui";
import { parse } from "marked";
import routers from "routers";
import $ from "jquery";
import { useMedia } from "react-use";
import { ALL_TAGS, BREAKPOINT } from "constants/index";
import {
  ADD_ARTICLE,
  EDIT_ARTICLE,
  GET_ARTICLE_DETAIL
} from "services/article";
import { useEditorState, CommonEditor } from "components/editor";
import { getRQualityImage, getSummary } from "utils";
import {
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Paper,
  SvgIcon,
  TextField,
  Tooltip
} from "@mui/material";
import _ from "lodash";
import { AppTitle } from "components/appTitle";
import MDIcon from "./MDIcon";

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
  const {
    reset,
    isEmpty,
    getParams,
    visibleStatus,
    onVisibleStatusChange,
    ...editorProps
  } = useEditorState({
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
    autoHandleError: true
    // successMessage: isEdit ? "文章修改成功" : "文章发布成功"
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
      params.cover = getRQualityImage(src);
    }
    params.summary = getSummary($html.text());

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

  const cs = isSM ? controls : simpleControls;

  return (
    <div>
      <AppTitle title={isEdit ? "编辑文章" : "写文章"} back={true} />
      <div className="container pt-14">
        <Spin spinning={loading}>
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
                  options={ALL_TAGS}
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
            <div>
              <CommonEditor
                {...editorProps}
                controls={cs}
                placeholder={
                  isEdit
                    ? "按 Ctrl + S / Command + S 保存"
                    : "按 Ctrl + S / Command + S 发布"
                }
                extendControls={[
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
                              <MDIcon />
                            </SvgIcon>
                          </IconButton>
                        </Tooltip>
                      </div>
                    )
                  }
                ]}
                onSubmit={handleSubmit}
              />
              <div className="flex justify-between">
                <div className="ml-4">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={visibleStatus === 1 ? true : false}
                        size="small"
                        color="primary"
                        onChange={(ev, checked) => {
                          onVisibleStatusChange(checked ? 1 : 0);
                        }}
                      />
                    }
                    label={<span className="text-sm">仅自己可见</span>}
                  />
                </div>
                <div className="text-right">
                  {isEdit && (
                    <Button
                      size="large"
                      onClick={() => {
                        history.goBack();
                      }}
                    >
                      取消
                    </Button>
                  )}
                  <Button size="large" onClick={handleSubmit}>
                    {isEdit ? "保存" : "发布"}
                  </Button>
                </div>
              </div>
            </div>
          </Paper>
        </Spin>
      </div>
    </div>
  );
}

export default Editor;
