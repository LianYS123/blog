import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@mui/material";
import { ALL_TAGS } from "constants/index";
import { Box } from "@mui/system";
import { useState } from "react";

/**
 * 标签编辑器
 */
export const TagSelector = ({ tags, setTags }) => {
  const [visible, setVisible] = useState(false); // 是否显示编辑标签弹出框
  return (
    <Box>
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
                <Chip size="small" label={option} {...getTagProps({ index })} />
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
    </Box>
  );
};
