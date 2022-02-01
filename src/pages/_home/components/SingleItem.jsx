import React from "react";
import { ShadowCard } from "./ShadowCard";

export const SingleItem = ({ href, source, title, subTitle }) => {
  return (
    <div
      // className="overflow-hidden bg-gray-500 rounded-lg relative cursor-pointer"
      className="h-48 sm:h-96"
      onClick={() => {
        if (href) {
          location.href = href;
        }
      }}
    >
      <ShadowCard source={source} title={title} subTitle={subTitle}>
        <div
          className="mt-20 sm:mt-40 text-white text-center"
          style={{ textShadow: "1px 1px 2px black" }}
        >
          <p className="text-xl sm:text-2xl font-bold">{title}</p>
          <p className="text-sm sm:text-base mt-2 text-gray-100">{subTitle}</p>
        </div>
      </ShadowCard>

      {/* <div
        className="absolute left-0 right-0 bottom-0 mx-4 my-3 md:mx-6 md:my-4 text-white"
        style={{ textShadow: "1px 1px 2px black" }}
      >
        <p className="text-lg font-bold">{title}</p>
        <p className="text-sm text-gray-100">{subTitle}</p>
      </div> */}
    </div>
  );
};