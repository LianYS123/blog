import React from "react";
import { useIntl } from "react-intl";
import { useDocAuth, useHtmlAndOutline } from "./hooks";
import { Anchor, Empty, Spin } from "@douyinfe/semi-ui";

import { useHistory, useParams } from "react-router";
import routers from "routers";
import { IconEdit } from "@douyinfe/semi-icons";

const { Link } = Anchor;

function Detail() {
  const { id: resourceId } = useParams();
  const intl = useIntl();
  const history = useHistory();

  const auth = useDocAuth();
  const { html, outline, loading } = useHtmlAndOutline(resourceId);

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
            <div
              onClick={() => {
                const pathname = routers.EDITOR_EDIT.replace(":id", resourceId);
                history.push(pathname);
              }}
              className="flex items-center hover:underline cursor-pointer"
            >
              <IconEdit className="mx-1" />
              {intl.formatMessage({ id: "EDIT_ARTICLE" })}
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
