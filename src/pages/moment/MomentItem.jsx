import { Lock } from "@mui/icons-material";
import { Avatar, Card, CardHeader, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ActionMenuButton } from "components/action/ActionMenuButton";
import { useCustomMutation } from "hooks";
import { useAlertDialog } from "providers/AlertDialogProvider";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DELETE_MOMENT } from "services/moment";
import { getQualityImage, timestampFormat } from "utils";
import { MomentEditor } from "./MomentEditor";

/**
 * 动态项
 */
export const MomentItem = ({ reload, removeItemById, editItem, ...record }) => {
  const {
    createTime,
    html,
    authorName,
    id,
    authorAvatar,
    createUser,
    visibleStatus
  } = record;
  const { userInfo } = useSelector(state => state.app);
  const { open: openDialog } = useAlertDialog();
  const [editing, setEditing] = useState(false); // 是否正在编辑

  // 删除
  const [deleteEssay] = useCustomMutation(DELETE_MOMENT);

  const handleDelete = () => {
    openDialog({
      title: "提示",
      content: "你确定要删除这条动态吗？",
      onOk: async () => {
        const { success } = await deleteEssay({ id: record.id });
        if (success) {
          removeItemById(id);
        }
      }
    });
  };

  // 操作按钮
  const actions = [
    {
      text: "编辑",
      onClick: () => {
        setEditing(true);
      }
    },
    {
      text: "删除",
      onClick: () => {
        handleDelete();
      }
    }
  ];

  const headerEl = (
    <CardHeader
      title={authorName} // 文章标题
      // subheader={subheaderEl}
      avatar={
        // 头像
        authorName ? (
          <Tooltip title={authorName}>
            <Avatar
              sx={{ width: 28, height: 28 }}
              src={getQualityImage(authorAvatar)}
            />
          </Tooltip>
        ) : null
      }
      /* 只有发布者有编辑权限 */
      action={
        userInfo.id === createUser ? (
          <ActionMenuButton actions={actions} />
        ) : null
      }
    />
  );

  return (
    <Card>
      {headerEl}
      <Box sx={{ px: 2, pb: 2 }}>
        {editing ? (
          <MomentEditor
            onCancel={() => setEditing(false)}
            onSuccess={() => setEditing(false)}
            isEdit={true}
            record={record}
            editItem={editItem}
          />
        ) : (
          <article
            id="htmlTemplate"
            dangerouslySetInnerHTML={{ __html: html }}
          ></article>
        )}
        <Box display="flex" alignItems="center">
          <Typography
            variant="subtitle1"
            color={theme => theme.palette.text.secondary}
            mr={1}
            component="span"
          >
            {timestampFormat(createTime)}
          </Typography>
          {visibleStatus === 1 && (
            <Tooltip title="仅自己可见">
              <Typography
                color={theme => theme.palette.text.secondary}
                variant="subtitle1"
                mr={1}
                component="span"
              >
                <Lock sx={{ fontSize: 16 }} />
              </Typography>
            </Tooltip>
          )}
        </Box>
      </Box>
    </Card>
  );
};
