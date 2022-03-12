import { IconButton, Paper, SvgIcon, Tooltip } from "@mui/material";
import MDIcon from "./MDIcon";
import { useMedia } from "react-use";
import { parse } from "marked";
import { BREAKPOINT } from "constants/index";
import { useEditorState, CommonEditor } from "components/editor";
import BraftEditor from "braft-editor";
import { controls, simpleControls } from "./config";
import $ from "jquery";
import { getRQualityImage, getSummary } from "utils";

export const RichEditor = ({ isEdit, data, getParamsFnRef }) => {
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

  // 是否是电脑端
  const isSM = useMedia(BREAKPOINT.sm);
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

  // 父组件获取参数的方法
  getParamsFnRef.current = () => {
    const params = getParams();
    const { html } = params;
    const $html = $(html);
    const src = $html.find("img").attr("src");
    if (src) {
      params.cover = getRQualityImage(src);
    }
    params.summary = getSummary($html.text());
    return params;
  };

  return (
    <Paper>
      {/* 文章内容编辑器 */}
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
      />
    </Paper>
  );
};
