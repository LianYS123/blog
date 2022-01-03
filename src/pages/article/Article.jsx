import { Tag, Typography } from "@douyinfe/semi-ui";
import React from "react";
import { useHistory } from "react-router";
import routers from "routers";
import { timestampFormat } from "utils";

export const Article = ({
  cover,
  summary,
  articleName,
  createTime,
  authorName,
  id,
  tags,
  handleTagClick
}) => {
  const history = useHistory();
  return (
    <section className="flex pb-2 border-b border-gray-200">
      <div className="flex w-full flex-col justify-between">
        <div className="space-y-1">
          <div>
            <h3
              onClick={() => history.push(routers.DETAIL.replace(":id", id))}
              className="text-lg mb-1 cursor-pointer font-bold hover:underline"
            >
              {articleName}
            </h3>
            <span className="space-x-1">
              {tags &&
                tags.map(it => (
                  <Tag
                    onClick={() => handleTagClick(it)}
                    key={it.tagName}
                    color={it.tagColor || "white"}
                  >
                    {it.tagName}
                  </Tag>
                ))}
            </span>
          </div>
          <div className="flex">
            {/* <p
              onClick={() => history.push(routers.DETAIL.replace(":id", id))}
              className="text-base sm:text-xs text-gray-800 dark:text-gray-50 cursor-pointer flex-auto h-full md:text-base overflow-hidden hover:underline font-normal mr-1 md:mr-4"
            >
              {summary}
            </p> */}
            <div className="w-full mb-1">
              <Typography.Paragraph
                onClick={() => history.push(routers.DETAIL.replace(":id", id))}
                className="text-base sm:text-xs text-gray-800 dark:text-gray-50 cursor-pointer overflow-hidden flex-auto md:text-base font-normal mr-1 md:mr-4"
                ellipsis={{ rows: 3 }}
              >
                {summary}
              </Typography.Paragraph>
            </div>
            {cover ? (
              <div className="w-24 max-h-16 sm:max-h-28 flex-shrink-0 md:w-36">
                <img
                  src={cover}
                  alt="scene"
                  className="object-center object-cover overflow-hidden rounded w-full h-full"
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className="font-semibold">
          <div className="text-gray-500 font-thin space-x-2">
            <span className="text-green-600 text-base sm:text-lg font-light hover:underline">
              {authorName}
            </span>
            <span>{timestampFormat(createTime)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
