import React from "react";
import TextField from "@mui/material/TextField";

import { useFormik } from "formik";
import * as yup from "yup";
import { USER_LOGIN } from "services/auth";
import { useMutation } from "hooks";
import { useDispatch } from "react-redux";
import { encrypt, getCommonFieldProps } from "utils";
import { appSlice } from "models/app";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Typography
} from "@mui/material";
import { useLocation } from "react-router-dom";
import routers from "routers";
import LogoWithText from "./LogoWithText";
import Logo from "./Logo";

/**
 * 登录页
 */
export default function Login() {
  const history = useHistory();
  const { search } = useLocation();
  const redirect = new URLSearchParams(search).get("redirect");
  const { enqueueSnackbar } = useSnackbar();

  // 登录
  const [submit, { loading }] = useMutation(USER_LOGIN);
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    account: yup.string("请输入账号").required("请输入账号"),
    password: yup
      .string("请输入密码")
      .min(6, "密码长度必须大于6位")
      .max(20, "密码长度必须小于20位")
  });

  const formik = useFormik({
    initialValues: {
      account: "",
      password: ""
    },
    validationSchema,
    onSubmit: async _values => {
      const values = { ..._values };
      values.password = encrypt(values.password); // 加密
      const result = await submit(values);
      const { data: token, success, code, message } = result;

      if (success) {
        dispatch(appSlice.actions.setToken(token));
        if (redirect) {
          history.push(redirect);
        } else {
          history.push(routers.HOME);
        }
      } else if (code === 1011002) {
        enqueueSnackbar("账号或密码错误");
      } else {
        enqueueSnackbar(message);
      }
    }
  });

  return (
    <Container sx={{ overflow: "auto", py: 2 }}>
      <Box className="flex items-center cursor-pointer">
        <Logo onClick={() => history.push(routers.HOME)} width="80" />
        <Typography
          onClick={() => history.push(routers.HOME)}
          variant="h6"
          className="font-extrabold"
          style={{ transform: "translateY(-2px)" }}
        >
          Lian's Space
        </Typography>
      </Box>

      <Box className="flex justify-center">
        <LogoWithText style={{ width: 200 }} />
      </Box>
      <Card className="mt-5 mx-auto" sx={{ maxWidth: 512 }}>
        <CardHeader title="登录"></CardHeader>
        <CardContent>
          <TextField
            fullWidth
            variant="standard"
            label="账号"
            {...getCommonFieldProps("account", formik)}
          />
          <TextField
            type="password"
            fullWidth
            variant="standard"
            label="密码"
            {...getCommonFieldProps("password", formik)}
          />
        </CardContent>
        <CardActions>
          <LoadingButton
            fullWidth
            sx={{ py: 1, fontSize: 15 }}
            disabled={loading}
            loading={loading}
            onClick={formik.handleSubmit}
          >
            登录
          </LoadingButton>
        </CardActions>
      </Card>
    </Container>
  );
}
