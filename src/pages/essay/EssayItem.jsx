import React from "react";
import { renderDateTime } from "utils";

export const EssayItem = ({ createTime, html, author, id }) => {
  return (
    <section className="flex pb-2 border-b border-gray-200">
      <div className="flex w-full flex-col justify-between">
        <div className="space-y-1">
          {/* <div>
            <h3
              onClick={() => history.push(routers.DETAIL.replace(":id", id))}
              className="text-lg mb-1 cursor-pointer font-bold hover:underline"
            >
              {author.username}
            </h3>
          </div> */}
          <div className="flex">
            {/* <p
              onClick={() => history.push(routers.DETAIL.replace(":id", id))}
              className="text-base sm:text-xs text-gray-800 dark:text-gray-50 cursor-pointer flex-auto h-full md:text-base overflow-hidden hover:underline font-normal mr-1 md:mr-4"
            >
              {summary}
            </p> */}
            <div className="w-full mb-1">
              <article
                id="htmlTemplate"
                dangerouslySetInnerHTML={{ __html: html }}
              ></article>
            </div>
          </div>
        </div>
        <div className="font-semibold">
          <div className="text-gray-500 font-thin space-x-2">
            <span className="text-green-600 text-base sm:text-lg font-light hover:underline">
              {author?.username}
            </span>
            <span>{renderDateTime(createTime)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
