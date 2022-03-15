import { CompareArrowsOutlined, CompareOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Tooltip
} from "@mui/material";
import { Box } from "@mui/system";
import { UploadImage } from "components/upload";
import { isEmpty, pickBy } from "lodash";
import { useEffect, useState } from "react";
import { TagSelector } from "./TagSelector";

/**
 * 编辑文章详情
 */
export const DetailsConfirmModal = ({
  isEdit,
  record = {}, // 原文章数据
  initialValues,
  onOpen,
  visible,
  onClose,
  handleSubmit,
  submiting
}) => {
  const [tags, setTags] = useState([]);
  const [articleName, setArticleName] = useState("");
  const [summary, setSummary] = useState();
  const [cover, setCover] = useState();
  const [visibleStatus, setVisibleStatus] = useState(0); // 是否仅自己可见，0：否，1：是

  const setValues = data => {
    const { tags, articleName, cover, summary, visibleStatus } = data;
    tags && setTags(tags?.split("|"));
    articleName && setArticleName(articleName);
    summary && setSummary(summary);
    cover && setCover(cover);
    setVisibleStatus(visibleStatus || 0);
  };

  // 使用原文章数据初始化表单
  const resetValues = () => {
    setValues(record);
  };

  // 初始化
  useEffect(() => {
    // 优先使用已有文章数据初始化表单，若表单字段在原文章中不存在，则尝试从文章中生成数据
    setValues({ ...pickBy(initialValues, it => !isEmpty(it)), ...record });
  }, [initialValues]);

  // 点击发布
  const handleConfirm = () => {
    handleSubmit({ tags, articleName, summary, cover, visibleStatus });
  };

  // 张图片是否一样
  const isSameCover = (c1, c2) => {
    if (!c1 || !c2) {
      return false;
    }
    return c2.startsWith(c1) || c1.startsWith(c2);
  };

  return (
    <Dialog fullWidth open={visible} onClose={onClose}>
      <DialogTitle>文章详情</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          {/* 文章标题 */}
          <TextField
            variant="standard"
            size="small"
            value={articleName}
            onChange={ev => setArticleName(ev.target.value)}
            name="articleName"
            fullWidth
            label="文章标题"
          />

          {/* 文章标签 */}
          <TagSelector tags={tags} setTags={setTags} />

          {/* 摘要 */}
          <TextField
            variant="standard"
            size="small"
            value={summary}
            onChange={ev => setSummary(ev.target.value)}
            name="summary"
            multiline
            maxRows={6}
            fullWidth
            label="摘要"
          />

          {/* 上传封面 */}
          <Box sx={{ display: "flex" }}>
            <UploadImage value={cover} onChange={setCover}>
              <Button>上传封面</Button>
            </UploadImage>
            {/* 文章封面切换按钮 */}
            {/* 只有在编辑时原先已有封面，且封面不是文章的第一张图片时才会显示 */}
            <Box>
              {initialValues.cover &&
              !isSameCover(record.cover, initialValues.cover) ? (
                <Tooltip
                  title={
                    !isSameCover(cover, initialValues.cover)
                      ? "使用文章中的第一张图片作为封面"
                      : "使用原文章封面"
                  }
                >
                  <IconButton
                    onClick={() => {
                      setCover(
                        !isSameCover(cover, initialValues.cover)
                          ? initialValues.cover
                          : record.cover
                      );
                    }}
                  >
                    <CompareArrowsOutlined />
                  </IconButton>
                </Tooltip>
              ) : null}
            </Box>
          </Box>

          {/* 仅自己可见 */}
          <FormControlLabel
            control={
              <Checkbox
                checked={visibleStatus === 1 ? true : false}
                // size="small"
                color="primary"
                onChange={(ev, checked) => {
                  setVisibleStatus(checked ? 1 : 0);
                }}
              />
            }
            label="仅自己可见"
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <LoadingButton loading={submiting} onClick={handleConfirm}>
          {isEdit ? "保存" : "发布"}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
