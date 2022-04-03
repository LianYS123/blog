import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField
} from "@mui/material";
import { HOME_SECTION_TYPES } from "constants/index";
import { getCommonFieldProps } from "utils";
import { useSectionItemFormik } from "./hooks";

/**
 * 编辑/添加主页推荐条目的弹出框
 */
export const SectionItemDialog = props => {
  const { visible, isEdit, close } = props;
  const { formik, loading } = useSectionItemFormik({ ...props });
  const typeOptions = [
    {
      label: "文章",
      value: 0
    },
    {
      label: "资源",
      value: 1
    },
    {
      label: "图书",
      value: 2
    },
    {
      label: "文章收藏夹",
      value: 3
    },
    {
      label: "资源收藏夹",
      value: 4
    },
    {
      label: "图书收藏夹",
      value: 5
    }
  ];
  return (
    <Dialog open={visible} onClose={() => close()}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          {isEdit ? "编辑" : "创建"}
          模块
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            select
            variant="standard"
            label="推荐类型"
            fullWidth
            {...getCommonFieldProps("sectionType", formik)}
          >
            {typeOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            fullWidth
            variant="standard"
            label="模块 ID"
            {...getCommonFieldProps("itemId", formik)}
          />
          <TextField
            margin="dense"
            fullWidth
            variant="standard"
            label="模块名称"
            {...getCommonFieldProps("itemName", formik)}
          />

          <TextField
            margin="dense"
            fullWidth
            variant="standard"
            label="描述"
            multiline
            maxRows={6}
            {...getCommonFieldProps("itemDesc", formik)}
          />

          <TextField
            margin="dense"
            fullWidth
            variant="standard"
            label="图片"
            {...getCommonFieldProps("itemImage", formik)}
          />

          <TextField
            margin="dense"
            fullWidth
            variant="standard"
            label="链接地址"
            {...getCommonFieldProps("itemLink", formik)}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={() => close()}>
            取消
          </Button>
          <LoadingButton color="primary" loading={loading} type="submit">
            确认
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
