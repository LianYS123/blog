import React, { useState } from "react";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { ChangeAvatar } from "./ChangeAvatar";
import {
  Button,
  Container,
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
import { getCommonFieldProps } from "utils";

const Space = () => {
  const [visible, setVisible] = useState(false); // 修改密码的弹出框状态
  const { userInfo } = useSelector(state => state.app);
  const time = dayjs(userInfo.birthday || Date.now()).valueOf();
  const [birthday, setBirthday] = useState(time);
  const formik = useUserFormik({ birthday });

  return (
    <Container className="mx-auto max-w-3xl">
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
            <div className="text-center space-x-2">
              <Button onClick={() => setVisible(true)}>修改密码</Button>
              <Button type="submit">保存</Button>
            </div>
          </Stack>
        </form>
      </Paper>
      <ChangePasswordModal visible={visible} close={() => setVisible(false)} />
    </Container>
  );
};

export default Space;
