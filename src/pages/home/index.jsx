import { IconSearch } from "@douyinfe/semi-icons";
import { Typography } from "@material-ui/core";
import classNames from "classnames";
import LoginExpiredDialog from "components/dialog/LoginExpiredDialog";
// import { MenuButton } from "components/button/MenuButton";
import { useRequest } from "hooks";
import { stringify } from "query-string";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import routers from "routers";
import { GET_ALL_TAGS } from "services/tag";
import { PanelList } from "./components/PanelList";
import { PanelWall } from "./components/PanelWall";
import ShadowCard from "./components/ShadowCard";
import { SingleArticle } from "./components/SingleArticle";
import { SingleItem } from "./components/SingleItem";
import styles from "./styles.module.less";

const PanelMap = {
  SINGLE_ITEM: SingleItem,
  SINGLE_ARTICLE: SingleArticle,
  PANEL_LIST: PanelList,
  PANEL_WALL: PanelWall,
  SHADOW_CARD: ShadowCard
};

const Home = () => {
  const [keyword, setKeyword] = useState();
  const history = useHistory();
  const handleSearch = (kw = keyword) => {
    // 搜索
    if (kw) {
      // console.log(kw);
      history.push({
        pathname: routers.ARTICLE_LIST,
        search: stringify({ keyword: kw })
      });
    }
  };
  const { data: tags = [] } = useRequest({
    service: GET_ALL_TAGS,
    initialData: []
  });
  const showTags = tags.slice(0, 15);
  const showTagsLength = showTags.length;
  return (
    <div className="h-full">
      <div
        className="bg-center bg-cover bg-no-repeat h-full flex flex-col items-center px-4 py-40"
        style={{
          background:
            "url(https://liuli-1259462774.cos.ap-shanghai.myqcloud.com/c39d7a8e-90fb-4ec3-9db4-6eb4d728ff92cat-6747298_1280.jpeg)"
        }}
      >
        {/* <div className="mb-4">Stunning free images & royalty free stock</div> */}
        {/* <Typography gutterBottom variant="h5" component="h5">
          Lian's Blog
        </Typography>
        <Typography gutterBottom variant="h6" component="h6">
          记录技术、生活、心情、想法，以及一些有趣的事
        </Typography> */}
        {/* <div className="mb-8">
        </div> */}
        <div className="w-full" style={{ maxWidth: 800 }}>
          {/* 搜索框 */}
          <div className="rounded-lg flex items-center bg-white text-gray-500 h-14">
            <div
              onClick={() => handleSearch()}
              className="search-icon-box px-4 pt-1"
            >
              <IconSearch />
            </div>
            <div className="input-box flex-auto">
              <input
                type="text"
                value={keyword}
                onChange={ev => setKeyword(ev.target.value)}
                className="h-6 block outline-none bg-white"
                onKeyPress={ev => {
                  if (ev.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="输入关键词搜索"
              />
            </div>
          </div>
          {/* 热词 */}
          <div className="mb-4 mt-2 text-left">
            <span className="text-xs text-gray-300 mr-1">快速搜索: </span>
            {showTags.map((tag, index) => (
              <span
                key={index}
                onClick={() => handleSearch(tag.tagName)}
                className="cursor-pointer text-xs text-gray-300 hover:text-white"
              >
                <span className="hover:underline">{tag.tagName}</span>
                {index === showTagsLength - 1 ? "" : "，"}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* 登录状态验证 */}
      <LoginExpiredDialog />
    </div>
  );
};
export default Home;
