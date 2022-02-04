import { IconSearch } from "@douyinfe/semi-icons";
import { Typography } from "@mui/material";
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

// 主页
const Home = () => {
  const [keyword, setKeyword] = useState();
  const history = useHistory();

  // 搜索, 输入或点击关键词搜索
  const handleSearch = (kw = keyword) => {
    if (kw) {
      history.push({
        pathname: routers.ARTICLE_LIST,
        search: stringify({ keyword: kw })
      });
    }
  };

  // 请求所有标签
  const { data: tags = [] } = useRequest({
    service: GET_ALL_TAGS,
    initialData: []
  });

  const showTags = tags.slice(0, 15); // 需要显示的标签
  const showTagsLength = showTags.length;
  return (
    <div className="h-full">
      <div
        className="bg-center bg-cover bg-no-repeat h-full flex flex-col items-center px-4 pt-28"
        style={{
          background:
            "url(https://liuli-1259462774.cos.ap-shanghai.myqcloud.com/c39d7a8e-90fb-4ec3-9db4-6eb4d728ff92cat-6747298_1280.jpeg)"
        }}
      >
        {/* 网站Logo */}
        <svg
          width="8em"
          height="8em"
          className="cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-87.65 0 175.3 100"
        >
          <g
            fill="currentColor"
            transform="matrix(1.89883 0 0 1.89883 -89.653 97.33)"
          >
            <g>
              <path d="M21.34-9.738c.094-.235.14-.422.14-.563 0-.351-.123-.668-.369-.949-.246-.281-.568-.422-.966-.422a1.308 1.308 0 00-1.196.738 77.688 77.688 0 01-1.283 2.514 26.1 26.1 0 01-1.916 3.076 14.695 14.695 0 01-2.391 2.619c-.867.739-1.769 1.108-2.707 1.108-1.382 0-2.566-.85-3.55-2.549-.985-1.699-1.77-4.037-2.356-7.014a110.472 110.472 0 003.692-7.365 77.024 77.024 0 002.988-7.576 61.328 61.328 0 002.004-7.541c.492-2.496.738-4.916.738-7.26 0-1.898-.117-3.504-.352-4.816-.234-1.313-.562-2.379-.984-3.2-.422-.82-.943-1.412-1.564-1.775a4.073 4.073 0 00-2.092-.545c-.985 0-1.863.399-2.637 1.195-.773.797-1.459 1.875-2.057 3.235-.597 1.359-1.113 2.941-1.546 4.746a60.241 60.241 0 00-1.073 5.73 80.358 80.358 0 00-.615 6.188 100.256 100.256 0 00-.193 6.117c0 1.36.041 2.918.123 4.676.082 1.758.24 3.568.474 5.432a49.997 49.997 0 001.002 5.484c.434 1.793 1.002 3.392 1.705 4.799.704 1.406 1.559 2.543 2.567 3.41 1.008.867 2.215 1.301 3.621 1.301.914 0 1.775-.194 2.584-.58.808-.387 1.57-.891 2.285-1.512a14.787 14.787 0 001.986-2.109 27.063 27.063 0 001.653-2.374c.492-.796.931-1.564 1.318-2.302.387-.739.709-1.377.967-1.916zM3.727-23.871c0-1.969.064-3.949.193-5.942.129-1.992.305-3.902.527-5.73.223-1.828.498-3.539.826-5.133.329-1.594.692-2.976 1.09-4.148.399-1.172.826-2.098 1.283-2.778.458-.679.932-1.019 1.424-1.019.75 0 1.348.598 1.793 1.793.446 1.195.668 3.176.668 5.941 0 1.969-.205 4.037-.615 6.205a59.116 59.116 0 01-1.635 6.539 74.314 74.314 0 01-2.355 6.504 78.925 78.925 0 01-2.813 6.065 95.87 95.87 0 01-.281-3.973 85.616 85.616 0 01-.105-4.324z"></path>
              <path d="M24.68-27.598a3.165 3.165 0 00-.932-2.267 3.166 3.166 0 00-2.268-.932 3.165 3.165 0 00-2.267.932 3.165 3.165 0 00-.932 2.267c0 .891.311 1.647.932 2.268.621.621 1.377.932 2.267.932.891 0 1.647-.311 2.268-.932.621-.621.932-1.377.932-2.268zM18.984-6.996c0 1.172.135 2.267.405 3.287.269 1.02.679 1.904 1.23 2.654A6.293 6.293 0 0022.641.738c.797.446 1.722.668 2.777.668.82 0 1.629-.199 2.426-.597.797-.399 1.558-.92 2.285-1.565a17.423 17.423 0 002.057-2.18 33.964 33.964 0 003.216-4.834c.422-.773.774-1.429 1.055-1.968.094-.164.141-.364.141-.598 0-.328-.123-.633-.369-.914a1.188 1.188 0 00-.932-.422 1.308 1.308 0 00-1.195.738 44.884 44.884 0 01-2.215 3.955c-.75 1.184-1.494 2.198-2.233 3.041-.738.844-1.459 1.501-2.162 1.969-.703.469-1.383.703-2.039.703-.398 0-.814-.07-1.248-.211-.434-.14-.844-.421-1.23-.843-.387-.422-.704-1.014-.95-1.776-.246-.761-.369-1.763-.369-3.006 0-.914.03-1.916.088-3.005.059-1.09.129-2.122.211-3.094l.211-2.514a24.06 24.06 0 00.088-1.265c0-.352-.117-.663-.352-.932a1.114 1.114 0 00-.879-.404c-.398 0-.72.123-.966.369a1.493 1.493 0 00-.44.861 80.696 80.696 0 00-.633 10.09zm3.727-20.602c0 .328-.123.61-.369.844a1.212 1.212 0 01-.862.352 1.15 1.15 0 01-.843-.352 1.149 1.149 0 01-.352-.844c0-.328.117-.615.352-.861.234-.246.515-.369.843-.369.329 0 .616.123.862.369s.369.533.369.861z"></path>
              <path d="M61.242-9.809c.071-.164.106-.328.106-.492 0-.328-.123-.638-.369-.931a1.204 1.204 0 00-.967-.44 1.344 1.344 0 00-1.231.809c-.211.445-.468.972-.773 1.582a26.482 26.482 0 01-1.055 1.898 24.759 24.759 0 01-1.318 1.951 13.746 13.746 0 01-1.512 1.723 7.868 7.868 0 01-1.617 1.213c-.551.305-1.108.457-1.67.457-.867 0-1.547-.293-2.039-.879a5.898 5.898 0 01-1.108-2.074c-.246-.797-.404-1.6-.474-2.408a62.207 62.207 0 01-.141-1.881 1.388 1.388 0 00-.404-.879c-.246-.258-.533-.387-.861-.387a1.35 1.35 0 00-.914.334 1.301 1.301 0 00-.457.826c-.165 1.219-.452 2.274-.862 3.164-.41.891-.867 1.629-1.371 2.215-.504.586-1.031 1.02-1.582 1.301-.551.281-1.037.422-1.459.422-.586 0-1.078-.117-1.476-.352a2.73 2.73 0 01-.95-.914 3.771 3.771 0 01-.492-1.248 6.703 6.703 0 01-.141-1.353c0-1.43.229-2.666.686-3.709.457-1.043 1.025-1.91 1.705-2.602.68-.691 1.43-1.201 2.25-1.529.82-.328 1.594-.492 2.32-.492a5 5 0 011.319.158c.386.105.72.228 1.002.369a4.008 4.008 0 01.984.668c.258.258.574.387.949.387.352 0 .657-.135.914-.405.258-.269.387-.58.387-.931 0-.328-.129-.645-.387-.95a15.879 15.879 0 00-.386-.333c-.235-.2-.569-.416-1.002-.651a9.566 9.566 0 00-1.565-.65 6.421 6.421 0 00-2.004-.299c-1.078 0-2.197.234-3.357.703-1.16.469-2.221 1.172-3.182 2.109-.961.938-1.752 2.104-2.373 3.498-.621 1.395-.931 3.006-.931 4.834 0 .914.134 1.758.404 2.532.269.773.65 1.447 1.142 2.021a5.077 5.077 0 001.793 1.336c.704.317 1.489.475 2.356.475 1.101 0 2.203-.393 3.305-1.178 1.101-.785 2.05-1.846 2.847-3.182.422 1.313 1.096 2.403 2.022 3.27.926.867 2.068 1.301 3.427 1.301.961 0 1.875-.229 2.743-.686a11.125 11.125 0 002.425-1.74c.75-.703 1.43-1.477 2.04-2.32a32.01 32.01 0 002.724-4.483c.293-.598.486-.99.58-1.178z"></path>
              <path d="M66.621-3.164c.07-.68.147-1.523.229-2.531.082-1.008.17-2.022.263-3.041.094-1.02.17-1.975.229-2.866.058-.89.088-1.546.088-1.968 0-.563-.053-1.114-.159-1.653a5.719 5.719 0 00-.492-1.476 2.86 2.86 0 00-.896-1.072c-.375-.27-.832-.405-1.371-.405-.914 0-1.834.592-2.76 1.776-.926 1.183-1.916 3.029-2.971 5.537-.07.187-.105.363-.105.527 0 .352.117.662.351.932.235.269.551.404.95.404.257 0 .503-.07.738-.211.234-.141.41-.34.527-.598.844-2.039 1.535-3.462 2.074-4.271.539-.809.914-1.248 1.125-1.318.141.117.235.445.282.984.047.539.07 1.101.07 1.687 0 .446-.023.997-.07 1.653-.047.656-.106 1.365-.176 2.127l-.211 2.302c-.07.774-.141 1.495-.211 2.163-.07.668-.129 1.242-.176 1.722-.047.481-.07.803-.07.967 0 .75.205 1.33.615 1.74.41.41.955.616 1.635.616.492 0 .973-.17 1.441-.51.469-.34.938-1.002 1.407-1.987.234-.515.556-1.166.966-1.951.411-.785.856-1.611 1.336-2.478a56.41 56.41 0 011.547-2.619c.551-.879 1.09-1.67 1.617-2.373.528-.704 1.032-1.272 1.512-1.706.481-.433.908-.65 1.283-.65.188 0 .399.135.633.404.234.27.352.78.352 1.53 0 .445-.018.914-.053 1.406-.035.492-.082.984-.141 1.476-.058.493-.105.961-.14 1.407-.035.445-.053.843-.053 1.195 0 .82.064 1.635.193 2.443a6.61 6.61 0 00.756 2.215 4.448 4.448 0 001.547 1.617c.656.411 1.512.616 2.566.616a5.53 5.53 0 002.69-.703 11.46 11.46 0 002.391-1.758A16.197 16.197 0 0090-4.201a37.416 37.416 0 001.6-2.426c.457-.762.826-1.435 1.107-2.021.281-.586.469-.973.563-1.161.07-.164.105-.328.105-.492 0-.328-.123-.638-.369-.931a1.203 1.203 0 00-.967-.44 1.348 1.348 0 00-1.23.809c-.258.609-.651 1.406-1.178 2.39a22.438 22.438 0 01-1.863 2.901 14.28 14.28 0 01-2.338 2.461c-.844.691-1.711 1.037-2.602 1.037-.492 0-.89-.112-1.195-.334a2.137 2.137 0 01-.703-.914 4.856 4.856 0 01-.334-1.354 14.214 14.214 0 01-.088-1.617c0-.445.017-.92.053-1.424l.105-1.494c.035-.492.07-.955.105-1.389.036-.433.053-.802.053-1.107 0-1.313-.293-2.414-.879-3.305-.586-.89-1.488-1.336-2.707-1.336-.609 0-1.259.182-1.951.545-.691.364-1.377.955-2.057 1.776a35.487 35.487 0 00-1.951 2.672 68.573 68.573 0 00-3.357 5.642 77.57 77.57 0 00-1.301 2.549z"></path>
            </g>
          </g>
        </svg>
        {/* 搜索 */}
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
                className="h-6 w-full block outline-none bg-white"
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
