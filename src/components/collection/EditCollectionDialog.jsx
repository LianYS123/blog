import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import { getCommonFieldProps } from "utils";
import { useCollectionFormik } from "./hooks";

export const EditCollectionDialog = props => {
  const { visible, isEdit, close } = props;
  const { formik, loading } = useCollectionFormik({ ...props });
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
