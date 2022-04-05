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
import { useCollectionFormik } from "./hooks";

export const EditCollectionDialog = props => {
  const { visible, isEdit, close, record } = props;
  const [cover, setCover] = useState();
  useEffect(() => {
    if (record?.cover) {
      setCover(record.cover);
    }
  }, [record?.cover]);
  const { formik, loading } = useCollectionFormik({
    ...props,
    extra: { cover }
  });
  return (
    <Dialog open={visible} onClose={() => close()}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          {isEdit ? "编辑" : "创建"}
          收藏夹
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            fullWidth
            variant="standard"
            label="收藏夹名称"
            {...getCommonFieldProps("collectionName", formik)}
          />
          <TextField
            margin="dense"
            fullWidth
            variant="standard"
            label="描述"
            {...getCommonFieldProps("collectionDesc", formik)}
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
