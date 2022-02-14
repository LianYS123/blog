import React from "react";
import { CHANGE_PASSWORD } from "services/user";
import { useFormik } from "formik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import { useMutation } from "hooks";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import LoadingButton from "@mui/lab/LoadingButton";

// 修改密码弹出框
export const ChangePasswordModal = ({ close, visible }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [request, { loading }] = useMutation(CHANGE_PASSWORD, null, {
    autoHandleError: true
  });

  const validationSchema = yup.object({
    password: yup
      .string("请输入旧密码")
      .min(6, "密码长度必须大于6位")
      .max(16, "密码最长为16位")
      .required("请输入旧密码"),
    newPassword: yup
      .string("请输入新密码")
      .min(6, "密码长度必须大于6位")
      .max(20, "密码最长为20位")
      .required("请输入新密码"),
    newPassword2: yup
      .string("请确认新密码")
      .min(6, "密码长度必须大于6位")
      .max(20, "密码最长为20位")
      .required("请确认新密码")
  });

  const formik = useFormik({
    validationSchema,
    initialValues: { password: "", newPassword: "", newPassword2: "" },
    onSubmit: async values => {
      if (values.newPassword !== values.newPassword2) {
        enqueueSnackbar("两次输入的密码不一致", { variant: "error" });
        return;
      }
      const { success } = await request(values);
      if (success) {
        enqueueSnackbar("密码已更新");
        close();
      }
    }
  });

  return (
    <Dialog open={visible} onClose={() => close()}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>修改密码</DialogTitle>
        <DialogContent>
          <TextField
            type="password"
            name="password"
            fullWidth
            margin="dense"
            variant="standard"
            label="密码"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            type="password"
            name="newPassword"
            fullWidth
            margin="dense"
            variant="standard"
            label="新密码"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.newPassword && !!formik.errors.newPassword}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          <TextField
            type="password"
            name="newPassword2"
            fullWidth
            margin="dense"
            variant="standard"
            label="确认密码"
            value={formik.values.newPassword2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.newPassword2 && !!formik.errors.newPassword2}
            helperText={
              formik.touched.newPassword2 && formik.errors.newPassword2
            }
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={() => close()}>
            取消
          </Button>
          <LoadingButton loading={loading} type="submit">
            确认
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
