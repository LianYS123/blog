import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography
} from "@mui/material";
import { renderDateTime } from "utils";

/**
 * 文章详情弹出框
 */
export const DetailDialog = ({ visible, setVisible, ...data }) => {
  const { cover, summary, createTime, updateTime, authorName, tags } = data;
  const tagArr = tags ? tags.split("|") : [];
  const renderCommonItem = (name, value) => {
    if (!value) return null;
    return (
      <Box display="flex">
        <Typography variant="subtitle1" whiteSpace="nowrap">
          {name}：
        </Typography>
        <Typography variant="body1" lineHeight="1.75">
          {value}
        </Typography>
      </Box>
    );
  };
  return (
    <Dialog open={visible} onClose={() => setVisible(false)}>
      <DialogTitle>文章详情</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          {/* 创建时间 */}
          {renderCommonItem("创建时间", renderDateTime(createTime))}
          {/* 更新时间 */}
          {renderCommonItem("更新时间", renderDateTime(updateTime))}
          {/* 作者 */}
          {renderCommonItem("作者", authorName)}
          {/* 封面 */}
          {renderCommonItem("封面", cover)}
          {/* 标签 */}
          {renderCommonItem("标签", tagArr.join("、"))}
          {/* 概要 */}
          {renderCommonItem("概要", summary)}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setVisible(false)}>确定</Button>
      </DialogActions>
    </Dialog>
  );
};
