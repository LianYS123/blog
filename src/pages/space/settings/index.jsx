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

const Settings = ({ onClose }) => {
  const [visible, setVisible] = useState(false); // 修改密码的弹出框状态
  const { userInfo } = useSelector(state => state.app);
  const { avatarUrl, email, nickName } = userInfo;
  const time = dayjs(userInfo.birthday || Date.now()).valueOf();
  const [birthday, setBirthday] = useState(time);
  const { formik, loading } = useUserFormik({ birthday, onClose });

  return (
    <Container
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Box
        sx={{
          height: "100%",
          px: 2,
          py: 6,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Box sx={{ display: "flex", mb: 2 }}>
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
        <Box
          sx={{
            position: "relative",
            flex: "auto"
          }}
          component="form"
          onSubmit={formik.handleSubmit}
        >
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
              renderInput={params => (
                <TextField variant="standard" {...params} />
              )}
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

          <Box
            sx={{ position: "absolute", left: 0, right: 0, bottom: 0 }}
            className="text-right"
          >
            <Button sx={{ mr: 2 }} onClick={onClose} variant="outlined">
              取消
            </Button>
            <LoadingButton loading={loading} variant="outlined" type="submit">
              保存
            </LoadingButton>
          </Box>
        </Box>
        <ChangePasswordModal
          visible={visible}
          close={() => setVisible(false)}
        />
      </Box>
    </Container>
  );
};

export default Settings;
