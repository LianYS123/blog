import React from "react";
import { useIntl } from "react-intl";
import { useDocAuth, useHtmlAndOutline } from "./hooks";
import {
  Anchor,
  Empty,
  Modal,
  Select,
  Spin,
  Tag,
  Typography
} from "@douyinfe/semi-ui";

import { useHistory, useParams } from "react-router";
import routers from "routers";
import { IconDelete, IconEdit } from "@douyinfe/semi-icons";
import { useMutation } from "hooks";
import { DELETE_ARTICLE } from "services/article";

const { Link } = Anchor;

function Detail() {
  const { id: resourceId } = useParams();
  const intl = useIntl();
  const history = useHistory();

  const auth = useDocAuth();
  const { html, outline, loading, id, tags, articleName } =
    useHtmlAndOutline(resourceId);
  const [deleteArticle] = useMutation(DELETE_ARTICLE);

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
    <div className="container">
      <Spin className="w-full" spinning={loading}>
        <div className="relative mb-8">
          <div className="mb-2">
            <Typography.Title>{articleName}</Typography.Title>
          </div>
          <div>
            {tags &&
              tags.map(it => (
                <Tag className="m-1" key={it.id} color={it.color}>
                  {it.tagName}
                </Tag>
              ))}
          </div>
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
          <div className="absolute hidden sm:block right-0 top-4">
            <div className="fixed right-0 w-64">
              {auth && (
                <div className="flex mb-4 -ml-2">
                  <span
                    onClick={() => {
                      const pathname = routers.EDITOR_EDIT.replace(
                        ":id",
                        resourceId
                      );
                      history.push(pathname);
                    }}
                    className="flex items-center hover:underline cursor-pointer mr-2"
                  >
                    <IconEdit className="mx-1" />
                    {intl.formatMessage({ id: "EDIT_ARTICLE" })}
                  </span>

                  <span
                    onClick={() => {
                      Modal.warning({
                        title: "你确定要删除该文章吗？",
                        content: "删除后不可恢复，请谨慎操作",
                        onOk: async () => {
                          const { success } = await deleteArticle({ id });
                          if (success) {
                            history.push(routers.HOME);
                          }
                        },
                        okButtonProps: {
                          type: "danger"
                        }
                      });
                    }}
                    className="flex items-center hover:underline cursor-pointer text-red-500"
                  >
                    <IconDelete className="mx-1" />
                    删除文章
                  </span>
                </div>
              )}
              {outline && outline.length ? (
                <Anchor>{renderLink(outline)}</Anchor>
              ) : null}
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
}

export default Detail;
