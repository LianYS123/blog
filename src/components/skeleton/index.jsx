import React from "react";
import { Skeleton } from "@douyinfe/semi-ui";

export const ArticlePlaceholder = () => (
  <section className="shadow-sm px-4 py-3 flex rounded">
    <div className="flex w-full flex-col justify-between">
      <div className="space-y-1">
        <Skeleton.Title className="font-bold w-48"></Skeleton.Title>
        <div className="flex h-16 md:h-24">
          <Skeleton.Paragraph className="flex-auto h-full mr-1 md:mr-4"></Skeleton.Paragraph>
          <Skeleton.Image className="h-full w-24 flex-shrink-0 md:w-40" />
        </div>
      </div>
      <div className="space-x-2 flex">
        <Skeleton.Button />
        <Skeleton.Button />
      </div>
    </div>
  </section>
);
