import React from "react";
import { useIntl } from "react-intl";
import { useDocAuth, useHtmlAndOutline } from "./hooks";
import { Anchor, Empty, Modal, Spin } from "@douyinfe/semi-ui";

import { useHistory, useParams } from "react-router";
import routers from "routers";
import { IconDelete, IconEdit } from "@douyinfe/semi-icons";
import { useMutation } from "hooks";
import { DELETE_ARTICLE } from "services/API";

const { Link } = Anchor;

function Detail() {
  const { id: resourceId } = useParams();
  const intl = useIntl();
  const history = useHistory();

  const auth = useDocAuth();
  const { html, outline, loading, id } = useHtmlAndOutline(resourceId);
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
    <div className="py-8">
      <Spin className="w-full" spinning={loading}>
        <div>
          {html ? (
            <article
              className="w-full"
              id="htmlTemplate"
              dangerouslySetInnerHTML={{ __html: html }}
            ></article>
          ) : (
            <Empty className="my-12" />
          )}

          {auth && (
            <div className="flex">
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
                      const { code } = await deleteArticle({ id });
                      if (code === "0000") {
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
        </div>
      </Spin>
      {outline && outline.length ? (
        <div className="top-12 w-56 absolute">
          <Anchor
            className="fixed right-2"
            getContainer={() => document.getElementById("container")}
          >
            {renderLink(outline)}
          </Anchor>
        </div>
      ) : null}
    </div>
  );
}

export default Detail;
