import { Card } from "./Card";
import React from "react";
import { useTable } from "hooks";
import { ARTICLE_LIST } from "services/API";
import { Pagination, Skeleton, Spin } from "@douyinfe/semi-ui";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import routers from "routers";

const Home = () => {
  const { dictMap } = useSelector(state => state.app);
  const { HOME_IMAGE } = dictMap;
  const { tableProps, loading } = useTable({
    service: ARTICLE_LIST
  });
  const history = useHistory();
  const { dataSource, pagination } = tableProps;
  const placeholder = (
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
  return (
    <div className="space-y-3 mt-8 mb-16">
      {HOME_IMAGE ? (
        <div
          className="overflow-hidden bg-gray-500 rounded-lg relative cursor-pointer"
          onClick={() => history.push(routers.USER_SPACE)}
          style={{
            height: "30vw",
            backgroundImage: `url(${HOME_IMAGE})`,
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}
        >
          <div
            className="absolute left-0 right-0 bottom-0 mx-4 my-3 md:mx-6 md:my-4 text-white"
            style={{ textShadow: "1px 1px 2px black" }}
          >
            <p className="text-lg font-bold">欢迎来到我的空间</p>
            <p className="text-sm text-gray-100">
              记录想法、知识和一些有趣的事物
            </p>
          </div>
          {/* <img
            className="object-cover w-full h-full object-center rounded-lg"
            src={HOME_IMAGE}
          /> */}
        </div>
      ) : null}

      <div className="mb-4">
        {dataSource.length ? (
          dataSource.map(it => (
            <Skeleton
              active
              key={it.id}
              loading={loading}
              placeholder={placeholder}
            >
              <Card {...it} />
            </Skeleton>
          ))
        ) : (
          <Skeleton active loading={loading} placeholder={placeholder}>
            loading...
          </Skeleton>
        )}
      </div>
      <Pagination {...pagination} />
    </div>
  );
};
export default Home;
