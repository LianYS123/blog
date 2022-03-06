import { Delete, Edit, InfoOutlined, SyncAlt } from "@mui/icons-material";
import { Favorite, ThumbUp } from "@mui/icons-material";
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { CollectionDialog } from "components/collection/SelectCollectionDialog";
import { useMutation } from "hooks";
import { useSnackbar } from "notistack";
import { useAlertDialog } from "providers/AlertDialogProvider";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import routers from "routers";
import { DELETE_ARTICLE, SYNC_TO_MOMENT } from "services/article";
import { useIsCurrentUser } from "./hooks";

/**
 * 文章操作栏
 */
export const DialActions = ({ id, setVisible: showArticleInfo, authorId }) => {
  const { id: resourceId } = useParams(); // 文章id
  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();

  const isCurrentUser = useIsCurrentUser(authorId);

  // 操作项可视状态
  const [actionVisible, setActionVisible] = React.useState(false);

  // 收藏夹可视状态
  const [collectionVisible, setCollectionVisible] = useState(false);
  const closeCollectionDialog = () => setCollectionVisible(false);
  const openCollectionDialog = () => setCollectionVisible(true);

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

  const actions = [
    {
      text: "点赞",
      icon: <ThumbUp />,
      onClick: () => enqueueSnackbar("建设中..."),
      auth: false // 是否需要作者权限
    },
    {
      text: "收藏",
      icon: <Favorite />,
      onClick: openCollectionDialog,
      auth: false
    },
    {
      text: "编辑文章",
      icon: <Edit />,
      onClick: jumpToEditor,
      auth: true
    },
    {
      text: "同步到随笔",
      icon: <SyncAlt />,
      onClick: handleSyncToMoment,
      auth: true
    },
    {
      text: "详细信息",
      icon: <InfoOutlined />,
      onClick: () => showArticleInfo(true)
    },
    {
      text: "删除文章",
      icon: <Delete color="error" />,
      onClick: handleDelete,
      auth: true
    }
  ].filter(action => !action.auth || isCurrentUser);

  return (
    <Box position="fixed" right={0} bottom={0}>
      <SpeedDial
        ariaLabel="操作"
        open={actionVisible}
        onClick={() => setActionVisible(!actionVisible)}
        sx={{
          position: "absolute",
          bottom: 64,
          right: { xs: 16, sm: 64 }
        }}
        icon={<SpeedDialIcon />}
      >
        {actions.reverse().map((action, index) => (
          <SpeedDialAction
            key={index}
            onClick={ev => {
              ev.stopPropagation();
              action.onClick();
            }}
            icon={action.icon}
            tooltipTitle={action.text}
          />
        ))}
      </SpeedDial>

      {collectionVisible ? (
        <CollectionDialog
          visible={collectionVisible}
          close={closeCollectionDialog}
          articleId={resourceId}
        ></CollectionDialog>
      ) : null}
    </Box>
  );
};
