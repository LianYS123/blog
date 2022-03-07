import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { CommonDrawer } from "components/drawer";
import { useState } from "react";
import { useSelector } from "react-redux";
import Settings from "./settings";
import SpaceTabs from "./tabs";

/**
 * 个人空间
 */
export default function Space() {
  const { userInfo } = useSelector(state => state.app);
  const [visible, setVisible] = useState(false); // 设置抽屉是否可视
  const { avatarUrl, email, nickName } = userInfo;
  return (
    <Container sx={{ mt: 8 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 4
        }}
      >
        {/* 头像 */}
        <Box sx={{ mr: 2 }}>
          <Avatar sx={{ width: 128, height: 128 }} src={avatarUrl} />
          {/* <ChangeAvatar /> */}
        </Box>
        {/* 头像右边的用户基本信息 */}
        <Box>
          <Typography variant="h4" gutterBottom component="div">
            {nickName}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
            fontSize={18}
            color={theme => theme.palette.text.secondary}
            component="div"
          >
            {email}
          </Typography>
          <Box>
            <Button
              variant="outlined"
              size="medium"
              onClick={() => setVisible(true)}
            >
              编辑个人信息
            </Button>
          </Box>
        </Box>
      </Box>

      {/* 个人创作选项卡 */}
      <SpaceTabs />

      {/* 个人信息设置弹出框 */}
      <CommonDrawer
        title={"个人信息设置"}
        open={visible}
        onClose={() => setVisible(false)}
        onOpen={() => setVisible(true)}
      >
        <Settings
          onOpen={() => setVisible(false)}
          onClose={() => setVisible(false)}
        />
      </CommonDrawer>
    </Container>
  );
}
