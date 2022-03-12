import React, { useState } from "react";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { ChangeAvatar } from "./ChangeAvatar";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useUserFormik } from "./hooks";
import DatePicker from "@mui/lab/DatePicker";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { getCommonFieldProps } from "utils";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { CommonDrawer } from "components/drawer";

/**
 * 设置页弹出框
 */
const Settings = props => {
  const { onClose } = props;
  const [visible, setVisible] = useState(false); // 修改密码的弹出框状态
  const { userInfo } = useSelector(state => state.app);
  const { email, nickName } = userInfo;
  const time = dayjs(userInfo.birthday || Date.now()).valueOf();
  const [birthday, setBirthday] = useState(time);
  const { formik, loading } = useUserFormik({ birthday, onClose });
  const extra = (
    <LoadingButton
      loading={loading}
      variant="outlined"
      size="small"
      type="submit"
    >
      保存
    </LoadingButton>
  );

  return (
    <CommonDrawer
      // title={"个人信息设置"}
      component="form"
      onSubmit={formik.handleSubmit}
      extra={extra}
      {...props}
    >
      <Container>
        <Box sx={{ display: "flex", my: 2 }}>
          {/* 头像 */}
          <Box sx={{ mr: 2 }}>
            <ChangeAvatar />
          </Box>
          {/* 头像右边的用户基本信息 */}
          <Box>
            <Typography variant="h6" gutterBottom component="div">
              {nickName}
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle1"
              fontSize={14}
              color={theme => theme.palette.text.secondary}
              component="div"
            >
              {email}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setVisible(true)}
            >
              修改密码
            </Button>
          </Box>
        </Box>
        <Stack spacing={2}>
          <TextField
            fullWidth
            variant="standard"
            label="昵称"
            {...getCommonFieldProps("nickName", formik)}
          />

          <TextField
            fullWidth
            variant="standard"
            label="邮箱"
            {...getCommonFieldProps("email", formik)}
          />

          <TextField
            name="phone"
            fullWidth
            variant="standard"
            label="手机"
            {...getCommonFieldProps("phone", formik)}
          />

          <TextField
            fullWidth
            variant="standard"
            label="电话"
            {...getCommonFieldProps("tel", formik)}
          />

          <DatePicker
            label="生日"
            value={birthday}
            onChange={setBirthday}
            renderInput={params => <TextField variant="standard" {...params} />}
          />

          <FormControl fullWidth size="small">
            <FormLabel>性别</FormLabel>
            <RadioGroup
              row
              defaultValue={1}
              value={formik.values.sex}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="sex"
            >
              <FormControlLabel
                value={1}
                control={<Radio size="small" />}
                label="男"
              />
              <FormControlLabel
                value={2}
                control={<Radio size="small" />}
                label="女"
              />
            </RadioGroup>
          </FormControl>
        </Stack>
        <ChangePasswordModal
          visible={visible}
          close={() => setVisible(false)}
        />
      </Container>
    </CommonDrawer>
  );
};

export default Settings;
