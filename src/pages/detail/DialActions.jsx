import { Delete, Edit, InfoOutlined, SyncAlt } from "@mui/icons-material";
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { useMutation } from "hooks";
import { useAlertDialog } from "providers/AlertDialogProvider";
import React from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import routers from "routers";
import { DELETE_ARTICLE, SYNC_TO_MOMENT } from "services/article";

/**
 * 文章操作栏
 */
export const DialActions = ({ id, setVisible }) => {
  const { id: resourceId } = useParams(); // 文章id
  const history = useHistory();

  const { open: openDialog } = useAlertDialog();

  // 删除文章操作
  const [deleteArticle] = useMutation(DELETE_ARTICLE, null, {
    autoHandleError: true,
    successMessage: "文章已删除"
  });

  const handleDelete = () => {
    openDialog({
      title: "提示",
      content: "你确定要删除该文章吗？",
      onOk: async () => {
        const { success } = await deleteArticle({ id });
        if (success) {
          history.push(routers.ARTICLE_LIST);
        }
      }
    });
  };

  // 同步到随笔
  const [syncToMoment] = useMutation(SYNC_TO_MOMENT, null, {
    autoHandleError: true,
    successMessage: "同步成功"
  });

  const handleSyncToMoment = () => {
    openDialog({
      title: "提示",
      content: "你确定要将这篇文章同步到动态吗？",
      onOk: async () => {
        await syncToMoment({ id });
      }
    });
  };

  // 跳转到编辑页
  const jumpToEditor = () => {
    const pathname = routers.EDITOR_EDIT.replace(":id", resourceId);
    history.push(pathname);
  };

  return (
    <Box position="fixed" right={0} bottom={0}>
      <SpeedDial
        ariaLabel="操作"
        sx={{
          position: "absolute",
          bottom: 64,
          right: { xs: 16, sm: 64 }
        }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          onClick={handleDelete}
          icon={<Delete color="error" />}
          tooltipTitle="删除文章"
        />
        <SpeedDialAction
          onClick={() => setVisible(true)}
          icon={<InfoOutlined />}
          tooltipTitle="详细信息"
        />
        <SpeedDialAction
          onClick={handleSyncToMoment}
          icon={<SyncAlt />}
          tooltipTitle="同步到随笔"
        />
        <SpeedDialAction
          onClick={jumpToEditor}
          icon={<Edit />}
          tooltipTitle="编辑文章"
        />
      </SpeedDial>
    </Box>
  );
};
