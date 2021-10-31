import { Typography } from "@douyinfe/semi-ui";
import dayjs from "dayjs";
import React from "react";
import { useHistory } from "react-router";
import routers from "routers";

const { Paragraph } = Typography;

export const Card = ({
  cover,
  summary,
  articleName,
  updateTime,
  authorName,
  id
}) => {
  const history = useHistory();
  return (
    <section className="shadow-sm px-4 py-3 flex rounded">
      <div className="flex w-full flex-col justify-between">
        <div className="space-y-1 group">
          <h3
            onClick={() => history.push(routers.DETAIL.replace(":id", id))}
            className="text-lg cursor-pointer font-bold group-hover:underline"
          >
            {articleName}
          </h3>
          <div className="flex h-16 md:h-24">
            <p
              onClick={() => history.push(routers.DETAIL.replace(":id", id))}
              className="text-sm cursor-pointer flex-auto h-full md:text-base overflow-hidden group-hover:underline font-normal mr-1 md:mr-4"
            >
              {summary}
            </p>
            {/* <div
              onClick={() => history.push(routers.DETAIL.replace(":id", id))}
              className="flex-auto mr-1 md:mr-4 group-hover:underline"
            >
              <Paragraph ellipsis={{ rows: 5 }}>{summary}</Paragraph>
            </div> */}
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
            <span>
              {dayjs(updateTime * 1000).format("YYYY-MM-DD HH:mm:ss")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
