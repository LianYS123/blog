import { Lock } from "@mui/icons-material";
import { Avatar, Paper, Tooltip } from "@mui/material";
import { ActionMenuButton } from "components/action/ActionMenuButton";
import { useMutation } from "hooks";
import { useAlertDialog } from "providers/AlertDialogProvider";
import React from "react";
import { useSelector } from "react-redux";
import { DELETE_MOMENT } from "services/essay";
import { getQualityImage, timestampFormat } from "utils";
import { EssayEditor } from "./EssayEditor";

export const EssayItem = ({
  editorRecord,
  setEditorRecord,
  reload,
  removeItemById,
  editItem,
  ...record
}) => {
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

  // 删除
  const [deleteEssay, { loading }] = useMutation(DELETE_MOMENT, null, {
    successMessage: "删除成功"
  });

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
        setEditorRecord(record);
      }
    },
    {
      text: "删除",
      onClick: () => {
        handleDelete();
      }
    }
  ];

  return (
    <Paper className="px-4 py-3">
      <div className="flex w-full flex-col justify-between">
        <div className="space-y-1">
          <div className="flex justify-between items-center border-b border-white dark:border-gray-500">
            {/* 发布者 */}
            <div className="space-x-2 flex items-center">
              <span>
                <Avatar
                  sx={{ width: 24, height: 24 }}
                  alt="avatar"
                  src={getQualityImage(authorAvatar)}
                />
              </span>
              <span className="text-green-600 text-base sm:text-lg font-light hover:underline">
                {authorName}
              </span>
            </div>
            {/* 操作 */}
            <div>
              {/* 只有发布者有编辑权限 */}
              {userInfo.id === createUser ? (
                <ActionMenuButton actions={actions} />
              ) : null}
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
    </Paper>
  );
};
