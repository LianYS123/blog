import React from "react";
import { useIntl } from "react-intl";
import { useDocAuth, useHtmlAndOutline } from "./hooks";
import { Anchor, Empty, Spin } from "@douyinfe/semi-ui";

import { useHistory, useLocation, useParams } from "react-router";
import { parse, stringify } from "query-string";
import "./styles.less";
import routers from "routers";
import { IconEdit } from "@douyinfe/semi-icons";

const { Link } = Anchor;

function Detail() {
  const { id: resourceId } = useParams();
  const { search } = useLocation();
  const { menu, resourcePath } = parse(search);
  const intl = useIntl();
  const history = useHistory();

  const editorSearch = stringify({
    resourceId,
    menu,
    resourcePath: resourcePath
  });

  const auth = useDocAuth();
  const { html, outline, loading } = useHtmlAndOutline(resourceId);

  const goEdit = () => {
    const pathname = routers.EDITOR + "?" + editorSearch;
    history.push(pathname);
  };

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
    <div id="anchor-box" className="max-w-full max-h-full overflow-auto py-8">
      <Spin spinning={loading}>
        <div className="flex">
          <div className="flex-auto relative mx-14">
            {html ? (
              <article
                id="htmlTemplate"
                dangerouslySetInnerHTML={{ __html: html }}
              ></article>
            ) : (
              <Empty className="my-12" />
            )}

            {auth && (
              <div className="flex items-center hover:underline cursor-pointer">
                <IconEdit className="mx-1" />
                {resourceId == "undefined"
                  ? intl.formatMessage({ id: "ADD_ARTICLE" })
                  : intl.formatMessage({ id: "EDIT_ARTICLE" })}
              </div>
            )}
          </div>
          {outline && outline.length ? (
            <Anchor getContainer={() => document.getElementById("anchor-box")}>
              {renderLink(outline)}
            </Anchor>
          ) : null}
        </div>
      </Spin>
    </div>
  );
}

export default Detail;
