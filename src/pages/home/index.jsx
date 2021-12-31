import classNames from "classnames";
// import { MenuButton } from "components/button/MenuButton";
import { useRequest } from "hooks";
import React from "react";
import { PanelList } from "./components/PanelList";
import { PanelWall } from "./components/PanelWall";
import { SingleArticle } from "./components/SingleArticle";
import { SingleItem } from "./components/SingleItem";
import styles from "./styles.module.less";

const PanelMap = {
  SINGLE_ITEM: SingleItem,
  SINGLE_ARTICLE: SingleArticle,
  PANEL_LIST: PanelList,
  PANEL_WALL: PanelWall
};

const items = [
  {
    id: 1,
    type: "SINGLE_ITEM",
    title: "这是我的空间",
    subTitle: "记录心情、想法，以及有趣的事",
    source:
      "https://liuli-1259462774.cos.ap-shanghai.myqcloud.com/c39d7a8e-90fb-4ec3-9db4-6eb4d728ff92cat-6747298_1280.jpeg"
  },
  {
    id: 8,
    type: "SINGLE_ARTICLE",
    articleId: 8
    // title: "欢迎来到我的空间",
    // subTitle: "记录心情、想法，以及一些有趣的事物",
    // source:
    //   "https://liuli-1259462774.cos.ap-shanghai.myqcloud.com/c39d7a8e-90fb-4ec3-9db4-6eb4d728ff92cat-6747298_1280.jpeg"
  }
  // {
  //   id: 2,
  //   type: "PANEL_LIST",
  //   panels: [
  //     {
  //       id: 1,
  //       title: "aaa",
  //       subTitle: "aaa",
  //       source:
  //         "https://lh3.googleusercontent.com/ZlzT2DFoTB6BZji6K0iub6_GO7H3oMHwKmZY_efgG0OWaaaw-5NWXI534Xhb83g2=w842-c-h908-rw-v1"
  //     },
  //     {
  //       id: 2,
  //       title: "aaa",
  //       subTitle: "aaa",
  //       source:
  //         "https://lh3.googleusercontent.com/ZlzT2DFoTB6BZji6K0iub6_GO7H3oMHwKmZY_efgG0OWaaaw-5NWXI534Xhb83g2=w842-c-h908-rw-v1"
  //     },
  //     {
  //       id: 3,
  //       title: "aaa",
  //       subTitle: "aaa",
  //       source:
  //         "https://lh3.googleusercontent.com/ZlzT2DFoTB6BZji6K0iub6_GO7H3oMHwKmZY_efgG0OWaaaw-5NWXI534Xhb83g2=w842-c-h908-rw-v1"
  //     },
  //     {
  //       id: 4,
  //       title: "aaa",
  //       subTitle: "aaa",
  //       source:
  //         "https://lh3.googleusercontent.com/ZlzT2DFoTB6BZji6K0iub6_GO7H3oMHwKmZY_efgG0OWaaaw-5NWXI534Xhb83g2=w842-c-h908-rw-v1"
  //     }
  //   ]
  // }
];

const Home = () => {
  // const { data = [] } = useRequest({
  //   service: GET_PANEL_LIST
  // });
  const data = items;
  // const data = [];

  return (
    <div
      className={classNames(
        "space-y-3",
        styles.home,
        "bg-gray-50 dark:bg-black"
      )}
    >
      Home Page
      {/* {data.map(it => {
        const { type, id } = it;
        const Comp = PanelMap[type] || "div";
        return <Comp key={id} {...it} />;
      })} */}
      {/* <MenuButton /> */}
    </div>
  );
};
export default Home;
