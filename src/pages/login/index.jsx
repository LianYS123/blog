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
import { Box, Container, Link, Stack, Typography } from "@mui/material";
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
      .required("请输入密码")
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
      {/* header */}
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

      {/* 登录卡片 */}
      <Box
        className="flex justify-center rounded-xl shadow overflow-hidden mx-auto mt-16 md:mt-8"
        sx={{
          width: { sx: "auto", md: 720 },
          height: { sx: "auto", md: 510 }
        }}
      >
        {/* 左边的插画 */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "primary.main",
            // p: 4,
            display: { xs: "none", md: "flex" },
            alignItems: "center"
          }}
        >
          {/* <Box px={2} width="100%">
            <LoginDraw className="w-full" />
          </Box> */}
          <img
            className="w-full h-full object-cover object-center"
            src="https://blog-1259462774.cos.ap-shanghai.myqcloud.com/gif/user_login_draw_zip.gif"
          />
        </Box>
        {/* 右边的登录表单 */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <Box p={4} component="form" onSubmit={formik.handleSubmit}>
            {/* Logo */}
            <Box className="flex justify-center" color="primary.main">
              <LogoWithText style={{ width: 160 }} />
            </Box>

            {/* 登录表单 */}
            <Stack spacing={2}>
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
            </Stack>
            <LoadingButton
              variant="contained"
              type="submit"
              fullWidth
              sx={{ py: 1, fontSize: 15, mt: 2 }}
              disabled={loading}
              loading={loading}
            >
              登录
            </LoadingButton>
            {/* <Link href="/api/oauth/render/github">Github</Link> */}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
