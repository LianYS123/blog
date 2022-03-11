import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField
} from "@mui/material";
import { UploadImage } from "components/upload";
import { useEffect, useState } from "react";
import { TagSelector } from "./TagSelector";

/**
 * 编辑文章详情
 */
export const DetailsConfirmModal = ({
  isEdit,
  record, // 原文章数据
  initialValues,
  onOpen,
  visible,
  onClose,
  handleSubmit
}) => {
  const [tags, setTags] = useState([]);
  const [articleName, setArticleName] = useState("");
  const [summary, setSummary] = useState();
  const [cover, setCover] = useState();

  const setValues = data => {
    const { tags, articleName, cover, summary } = data;
    tags && setTags(tags?.split("|"));
    articleName && setArticleName(articleName);
    summary && setSummary(summary);
    cover && setCover(cover);
  };

  // 使用原文章数据初始化表单
  const resetValues = () => {
    setValues(record);
  };

  // 初始化
  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  // 点击发布
  const handleConfirm = () => {
    handleSubmit({ tags, articleName, summary, cover });
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
          <UploadImage value={cover} onChange={setCover}>
            <Button>上传封面</Button>
          </UploadImage>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={resetValues}>重置</Button>
        <Button onClick={handleConfirm}>{isEdit ? "保存" : "发布"}</Button>
      </DialogActions>
    </Dialog>
  );
};
