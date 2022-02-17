import React, { useRef } from "react";
import { Anchor, Empty, Spin, Typography } from "@douyinfe/semi-ui";

import { useHistory, useParams } from "react-router";
import routers from "routers";
import { useMutation, useRequest } from "hooks";
import {
  DELETE_ARTICLE,
  GET_ARTICLE_DETAIL,
  SYNC_TO_MOMENT
} from "services/article";
import { getHtmlAndOutline } from "./utils";
import { useSelector } from "react-redux";
import { Box, Chip, Collapse, Container } from "@mui/material";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { Edit, Delete, SyncAlt } from "@mui/icons-material";
import { useAlertDialog } from "providers/AlertDialogProvider";
import { AppTitle } from "components/appTitle";
import { usePrevious, useWindowScroll } from "react-use";
import { useScrollDistance } from "hooks";

const { Link } = Anchor;

/**
 * 文章详情
 */
function Detail() {
  const { id: resourceId } = useParams(); // 文章id

  const { userInfo, logged } = useSelector(state => state.app);
  const { id: userId } = userInfo; // 用户信息

  const history = useHistory();
  const { y } = useWindowScroll();
  // const { downDis } = useScrollDistance();

  // 请求文章详情
  const { data, loading } = useRequest({
    service: GET_ARTICLE_DETAIL,
    necessaryParams: { id: resourceId },
    ready: !!resourceId && resourceId !== "undefined",
    initialData: { html: "" }
  });
  const { id, tags, articleName, authorId } = data;
  const tagArr = tags ? tags.split("|") : [];

  const isCurrentUser = logged && userId === authorId; // 是否是当前用户

  // 生成文章导航
  const { outline, html } = getHtmlAndOutline(data.html);

  // 渲染文章导航
  const renderLink = list => {
    return list.map(item => {
      let { id, children, title } = item;
      if (children && children.length > 0) {
        return (
          <Link key={id} href={`#${id}`} title={title}>
            {renderLink(children)}
          </Link>
        );
      } else {
        return <Link key={id} href={`#${id}`} title={title} />;
      }
    });
  };

  const { open: openDialog } = useAlertDialog();

  // 删除文章操作
  const [deleteArticle] = useMutation(DELETE_ARTICLE, null, {
    autoHandleError: true,
    successMessage: "文章删除成功"
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

  return (
    <div>
      <AppTitle
        title={y < 36 ? "" : articleName || "文章详情"}
        back={routers.ARTICLE_LIST}
      />
      <Container className="px-4 pt-14">
        <Spin className="w-full" spinning={loading}>
          <div className="relative mb-8">
            {/* 标题 */}
            <div className="mb-2">
              <Typography.Title>{articleName}</Typography.Title>
            </div>
            {/* 标签 */}
            <div>
              <span className="flex space-x-1">
                {tagArr.map(tag => (
                  <Chip size="small" key={tag} label={tag} />
                ))}
              </span>
            </div>
            {/* 正文 */}
            <div className="mr-0 sm:mr-52 mt-4">
              {html ? (
                <article
                  id="htmlTemplate"
                  dangerouslySetInnerHTML={{ __html: html }}
                ></article>
              ) : (
                <Empty className="my-12" />
              )}
            </div>
            {/* 右侧内容 */}
            <div className="absolute hidden sm:block right-0 top-4">
              <div className="fixed right-0 w-64 pl-2">
                {/* 文章快速跳转导航栏 */}
                {outline && outline.length ? (
                  <Anchor>{renderLink(outline)}</Anchor>
                ) : null}
              </div>
            </div>
            <div className="fixed right-0 bottom-0">
              {/* 操作栏，对作者显示 */}
              {isCurrentUser && (
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
                    // tooltipOpen
                  />
                  <SpeedDialAction
                    onClick={handleSyncToMoment}
                    icon={<SyncAlt />}
                    tooltipTitle="同步到随笔"
                    // tooltipOpen
                  />
                  <SpeedDialAction
                    onClick={() => {
                      const pathname = routers.EDITOR_EDIT.replace(
                        ":id",
                        resourceId
                      );
                      history.push(pathname);
                    }}
                    icon={<Edit />}
                    tooltipTitle="编辑文章"
                    // tooltipOpen
                  />
                </SpeedDial>
              )}
            </div>
          </div>
        </Spin>
      </Container>
    </div>
  );
}

export default Detail;
