import React, { useState } from "react";
import { useModalAction } from "hooks";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { ChangeAvatar } from "./ChangeAvatar";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useUserFormik } from "./hooks";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const Space = () => {
  const { open: openChangePasswordModal, ...passwordModalProps } =
    useModalAction();
  const { userInfo } = useSelector(state => state.app);
  const [birthday, setBirthday] = useState(dayjs(userInfo.birthday).valueOf());
  const formik = useUserFormik({ birthday });

  return (
    <div className="mx-auto py-8 px-2 w-full" style={{ maxWidth: 800 }}>
      <div className="text-center">
        <div className="flex justify-center">
          <ChangeAvatar />
        </div>
        <div>
          <Typography variant="h6" component="div">
            {userInfo.nickName}
          </Typography>
        </div>
      </div>
      <Paper className="p-8 flex-auto">
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              name="nickName"
              fullWidth
              variant="standard"
              label="昵称"
              value={formik.values.nickName}
              onChange={formik.handleChange}
              error={formik.touched && !!formik.errors.nickName}
              helperText={formik.touched.nickName && formik.errors.nickName}
              placeholder="请输入昵称"
            />

            <TextField
              name="email"
              fullWidth
              variant="standard"
              label="邮箱"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
              placeholder="请输入邮箱"
            />

            <TextField
              name="phone"
              fullWidth
              variant="standard"
              label="手机"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched && !!formik.errors.phone}
              helperText={formik.touched.phone && formik.errors.phone}
              placeholder="请输入手机号"
            />

            <TextField
              name="tel"
              fullWidth
              variant="standard"
              label="电话"
              value={formik.values.tel}
              onChange={formik.handleChange}
              error={formik.touched && !!formik.errors.tel}
              helperText={formik.touched.tel && formik.errors.tel}
              placeholder="请输入电话号码"
            />
            <div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="生日"
                  value={birthday}
                  onChange={setBirthday}
                  renderInput={params => (
                    <TextField variant="standard" {...params} />
                  )}
                />
              </LocalizationProvider>
            </div>

            <FormControl fullWidth size="small">
              <FormLabel>性别</FormLabel>
              <RadioGroup
                row
                defaultValue={1}
                value={formik.values.sex}
                onChange={formik.handleChange}
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
            <div className="text-center space-x-2">
              <Button>修改密码</Button>
              <Button type="submit">保存</Button>
            </div>
          </Stack>
        </form>
      </Paper>

      <ChangePasswordModal {...passwordModalProps} />
    </div>
  );
};

export default Space;
