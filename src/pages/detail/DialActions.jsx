import {
  ArrowUpwardOutlined,
  Delete,
  Edit,
  InfoOutlined,
  SyncAlt
} from "@mui/icons-material";
import { Favorite, ThumbUp } from "@mui/icons-material";
import {
  Box,
  ClickAwayListener,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { CollectionDialog } from "components/collection/SelectCollectionDialog";
import { COLLECTION_TYPES } from "constants";
import { useCustomMutation } from "hooks";
import { useAssertLogged } from "hooks/app";
import { useSnackbar } from "notistack";
import { useAlertDialog } from "providers/AlertDialogProvider";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import routers from "routers";
import { DELETE_ARTICLE, SYNC_TO_MOMENT } from "services/article";
import { useIsCurrentUser } from "./hooks";

/**
 * 文章操作栏
 */
export const DialActions = ({
  id,
  setVisible: showArticleInfo,
  authorId,
  collected: c
}) => {
  const [collected, setCollected] = useState(c); // 文章是否被收藏
  useEffect(() => {
    setCollected(c);
  }, [c]);

  const { id: articleId } = useParams(); // 文章id
  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();

  const isCurrentUser = useIsCurrentUser(authorId);

  // 登录断言
  const { assertLogged } = useAssertLogged();

  // 操作项可视状态
  const [actionVisible, setActionVisible] = React.useState(true);

  // 收藏夹可视状态
  const [collectionVisible, setCollectionVisible] = useState(false);
  const closeCollectionDialog = () => {
    setCollectionVisible(false);
  };
  const openCollectionDialog = () => setCollectionVisible(true);

  const { open: openDialog } = useAlertDialog();

  // 删除文章操作
  const [deleteArticle] = useCustomMutation(DELETE_ARTICLE, {
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
  const [syncToMoment] = useCustomMutation(SYNC_TO_MOMENT, {
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
    const pathname = routers.EDITOR_EDIT.replace(":id", articleId);
    history.push(pathname);
  };

  const actions = [
    // {
    //   text: "点赞",
    //   icon: <ThumbUp />,
    //   onClick: () => {
    //     assertLogged();
    //     enqueueSnackbar("建设中...");
    //   },
    //   auth: false // 是否需要作者权限
    // },
    {
      text: "收藏",
      icon: (
        <Favorite
          sx={{
            color: collected ? pink[300] : undefined
          }}
        />
      ),
      onClick: () => {
        assertLogged();
        openCollectionDialog();
      },
      auth: false
    },
    {
      text: "编辑文章",
      icon: <Edit />,
      onClick: jumpToEditor,
      auth: true
    },
    // {
    //   text: "同步到随笔",
    //   icon: <SyncAlt />,
    //   onClick: handleSyncToMoment,
    //   auth: true
    // },
    {
      text: "详细信息",
      icon: <InfoOutlined />,
      onClick: () => showArticleInfo(true)
    },
    {
      text: "回到顶部",
      icon: <ArrowUpwardOutlined />,
      onClick: () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    },
    {
      text: "删除文章",
      icon: <Delete />,
      onClick: handleDelete,
      auth: true
    }
  ].filter(action => !action.auth || isCurrentUser);

  return (
    <Box position="absolute" right={0} bottom={0}>
      <Box position="fixed" right={0} bottom={0}>
        <ClickAwayListener
          onClickAway={() => {
            if (actionVisible) {
              // setActionVisible(false);
            }
          }}
        >
          <SpeedDial
            ariaLabel="操作"
            open={actionVisible}
            onOpen={() => setActionVisible(true)}
            onClick={() => {
              if (actionVisible) {
                setActionVisible(false);
              }
            }}
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
        </ClickAwayListener>

        {collectionVisible ? (
          <CollectionDialog
            onChange={c => setCollected(c)}
            visible={collectionVisible}
            close={closeCollectionDialog}
            itemId={articleId}
            type={COLLECTION_TYPES.ARTICLE}
          ></CollectionDialog>
        ) : null}
      </Box>
    </Box>
  );
};
