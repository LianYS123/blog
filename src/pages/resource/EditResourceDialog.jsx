import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import { Box } from "@mui/system";
import { UploadImage } from "components/upload";
import { useEffect, useState } from "react";
import { getCommonFieldProps } from "utils";
import { useResourceFormik } from "./hooks";

export const EditResourceDialog = props => {
  const { visible, isEdit, close, record } = props;
  const [cover, setCover] = useState();
  useEffect(() => {
    if (record?.cover) {
      setCover(record.cover);
    }
  }, [record?.cover]);
  const { formik, loading } = useResourceFormik({
    ...props,
    extra: { cover }
  });
  return (
    <Dialog open={visible} onClose={() => close()}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          {isEdit ? "编辑" : "创建"}
          资源
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            fullWidth
            variant="standard"
            label="资源名称"
            {...getCommonFieldProps("resourceName", formik)}
          />
          <TextField
            margin="dense"
            fullWidth
            variant="standard"
            label="图标"
            {...getCommonFieldProps("icon", formik)}
          />
          <TextField
            margin="dense"
            fullWidth
            variant="standard"
            label="链接"
            {...getCommonFieldProps("link", formik)}
          />
          <TextField
            margin="dense"
            fullWidth
            variant="standard"
            label="标签"
            {...getCommonFieldProps("tags", formik)}
          />
          <TextField
            margin="dense"
            fullWidth
            variant="standard"
            label="描述"
            {...getCommonFieldProps("desc", formik)}
          />
          <TextField
            margin="dense"
            fullWidth
            variant="standard"
            label="详情"
            {...getCommonFieldProps("detail", formik)}
          />

          <Box sx={{ mt: 2 }}>
            <UploadImage value={cover} onChange={setCover}>
              <Button>上传封面</Button>
            </UploadImage>
          </Box>
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
