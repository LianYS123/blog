import { Tag } from "@douyinfe/semi-ui";
import dayjs from "dayjs";
import React from "react";
import { useHistory } from "react-router";
import routers from "routers";
import { renderDateTime } from "utils";

export const Card = ({
  cover,
  summary,
  articleName,
  createTime,
  authorName,
  id,
  tags
}) => {
  const history = useHistory();
  return (
    <section className="shadow-sm px-4 py-3 flex rounded">
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
                  <Tag key={it.id} color={it.color}>
                    {it.tagName}
                  </Tag>
                ))}
            </span>
          </div>
          <div className="flex h-16 md:h-24">
            <p
              onClick={() => history.push(routers.DETAIL.replace(":id", id))}
              className="text-xs text-gray-800 cursor-pointer flex-auto h-full md:text-base overflow-hidden hover:underline font-normal mr-1 md:mr-4"
            >
              {summary}
            </p>
            {cover ? (
              <div className="h-full w-24 flex-shrink-0 md:w-40">
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
            <span>{renderDateTime(createTime)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
