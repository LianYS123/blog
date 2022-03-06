import React, { useState } from "react";
import { Anchor, Empty } from "@douyinfe/semi-ui";

import { useParams } from "react-router";
import { useRequest } from "hooks";
import { GET_ARTICLE_DETAIL } from "services/article";
import { getHtmlAndOutline } from "./utils";
import { Chip, Container, Typography } from "@mui/material";

import { AppTitle } from "components/appTitle";
import { useWindowScroll } from "react-use";
import { DetailDialog } from "./DetailDialog";
import { DialActions } from "./DialActions";
import { SkeletonList } from "components/skeleton";
import { useLocation } from "react-router-dom";

const { Link } = Anchor;

/**
 * 文章详情
 */
function Detail() {
  const { id: resourceId } = useParams(); // 文章id
  const [infoVisible, setVisible] = useState(false); // 文章详情Dialog
  const { y } = useWindowScroll();
  const location = useLocation();

  // 请求文章详情
  const { data, loading } = useRequest({
    service: GET_ARTICLE_DETAIL,
    necessaryParams: { id: resourceId },
    ready: !!resourceId && resourceId !== "undefined",
    initialData: { html: "" }
  });
  const { articleName, authorId, id, tags } = data;
  const tagArr = tags ? tags.split("|") : [];

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

  return (
    <Container className="pt-14">
      <AppTitle
        title={y < 36 ? "" : articleName || "文章详情"}
        back={location?.state?.path || true}
      />
      <SkeletonList loading={loading} />
      <div className="relative px-4 pb-8">
        {/* 标题 */}
        <div className="mb-2">
          <Typography variant="h4">{articleName}</Typography>
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
        {/* 操作栏，对作者显示 */}
        <DialActions visible={infoVisible} setVisible={setVisible} {...data} />
      </div>
      <DetailDialog visible={infoVisible} setVisible={setVisible} {...data} />
    </Container>
  );
}

export default Detail;
