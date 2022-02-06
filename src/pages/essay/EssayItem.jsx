import {
  DeleteOutline,
  EditOutlined,
  Lock,
  MoreHoriz
} from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Tooltip
} from "@mui/material";
import { useModalAction, useMutation } from "hooks";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FILE_PREVIEW } from "services/app";
import { DELETE_MOMENT } from "services/essay";
import { timestampFormat } from "utils";
import AlertDialog from "./AlertDialog";
import { EssayEditor } from "./EssayEditor";

export const EssayItem = ({
  editorRecord,
  setEditorRecord,
  reload,
  removeItemById,
  editItem,
  ...record
}) => {
  const { open: openAlertDialog, ...alertDialogProps } = useModalAction();
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
  const [anchorEl, setAnchorEl] = useState();

  // 删除
  const [deleteEssay, { loading }] = useMutation(DELETE_MOMENT, null, {
    successMessage: "删除成功"
  });
  const handleDelete = () => {
    openAlertDialog({
      onOk: async () => {
        const { success } = await deleteEssay({ id: record.id });
        if (success) {
          removeItemById(id);
        }
      }
    });
  };

  // 操作按钮
  const renderOperator = () => {
    return (
      <div>
        <IconButton onClick={ev => setAnchorEl(ev.currentTarget)}>
          <MoreHoriz />
        </IconButton>
        <Menu
          open={!!anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorEl={anchorEl}
        >
          <MenuItem onClick={() => setEditorRecord(record)}>
            <ListItemIcon>
              <EditOutlined />
            </ListItemIcon>
            <ListItemText>编辑</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteOutline />
            </ListItemIcon>
            <ListItemText>删除</ListItemText>
          </MenuItem>
        </Menu>
      </div>
    );
  };
  return (
    <Paper className="px-4 py-3">
      <div className="flex w-full flex-col justify-between">
        <div className="space-y-1">
          <div className="flex justify-between items-center border-b border-white dark:border-gray-500">
            {/* 发布者 */}
            <div className="space-x-2 flex items-center">
              <span>
                {!authorAvatar ? (
                  <Avatar sx={{ width: 24, height: 24 }}>U</Avatar>
                ) : (
                  <Avatar
                    sx={{ width: 24, height: 24 }}
                    alt="avatar"
                    src={`${FILE_PREVIEW}?id=${authorAvatar}`}
                  />
                )}
              </span>
              <span className="text-green-600 text-base sm:text-lg font-light hover:underline">
                {authorName}
              </span>
            </div>
            {/* 操作 */}
            <div>
              {/* 只有发布者有编辑权限 */}
              {userInfo.id === createUser ? renderOperator() : null}
            </div>
          </div>
          {/* 内容 */}
          <div className="flex">
            <div className="w-full mb-1">
              {editorRecord?.id === id ? (
                <EssayEditor
                  onCancel={() => setEditorRecord(null)}
                  onSuccess={() => setEditorRecord(null)}
                  isEdit={true}
                  record={record}
                  editItem={editItem}
                  // reload={reload}
                />
              ) : (
                <article
                  id="htmlTemplate"
                  dangerouslySetInnerHTML={{ __html: html }}
                ></article>
              )}
            </div>
          </div>
        </div>
        {/* 其他信息 */}
        <div className="font-semibold">
          <div className="text-gray-500 dark:text-gray-50 font-thin space-x-2 flex items-center">
            <span>{timestampFormat(createTime)}</span>
            {visibleStatus === 1 && (
              <Tooltip title="仅自己可见">
                <Lock sx={{ fontSize: 16 }} />
              </Tooltip>
            )}
          </div>
        </div>
      </div>
      {/* 删除确认框 */}
      <AlertDialog
        title="你确定要删除吗？"
        content="删除后不可恢复，请谨慎操作。"
        loading={loading}
        {...alertDialogProps}
      />
    </Paper>
  );
};
