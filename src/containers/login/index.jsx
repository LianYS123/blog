import React from "react";
import TextField from "@mui/material/TextField";

import { useFormik } from "formik";
import * as yup from "yup";
import { USER_LOGIN } from "services/auth";
import { useCustomMutation } from "hooks";
import { useDispatch } from "react-redux";
import { encrypt, getCommonFieldProps } from "utils";
import { appSlice } from "models/app";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { Box, Card, Container, Link, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import routers from "routers";
import LogoWithText from "./LogoWithText";
import Logo from "./Logo";
import LiamsBlog from "svg/LiamsBlog";
import { useAppTitle } from "hooks/app";

/**
 * 登录页
 */
export default function Login() {
  useAppTitle();
  const history = useHistory();
  const { search } = useLocation();
  const redirect = new URLSearchParams(search).get("redirect");
  const { enqueueSnackbar } = useSnackbar();

  // 登录
  const [submit, { loading }] = useCustomMutation(USER_LOGIN);
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
    <Container sx={{ overflow: "auto", py: { xs: 6, sm: 4 }, height: "100%" }}>
      {/* header */}
      <Box
        sx={{
          display: "flex"
          // justifyContent: { xs: "center", sm: "flex-start" }
        }}
      >
        <Box
          sx={{
            width: { xs: 200, sm: 220 }
          }}
        >
          <LiamsBlog
            onClick={() => history.push(routers.HOME)}
            style={{ width: "100%", cursor: "pointer" }}
          />
        </Box>
      </Box>

      {/* 登录卡片 */}
      <Card
        className="mx-auto"
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: {
            xs: "15vh",
            sm: 8
          },
          width: { xs: "auto", sm: 720 },
          height: { xs: "auto", sm: 510 }
        }}
      >
        {/* 左边的插画 */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "primary.main",
            // p: 4,
            display: { xs: "none", sm: "flex" },
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
          <Box
            sx={{ px: 4, py: 6 }}
            component="form"
            onSubmit={formik.handleSubmit}
          >
            {/* Logo */}
            {/* <Box className="flex justify-center" color="primary.main" mb={2}>
              <LiamsBlog style={{ width: 160 }} />
            </Box> */}
            <Typography mb={1} variant="h5">
              登录
            </Typography>
            <Typography
              variant="subtitle2"
              mb={3}
              color={theme => theme.palette.text.secondary}
            >
              欢迎回来！输入你的个人信息
            </Typography>
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
      </Card>
    </Container>
  );
}
