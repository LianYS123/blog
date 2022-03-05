import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { MyArticleList } from "./articleList";
import { MyMomentList } from "./momentList";
import { Collection } from "./collection";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom";
import routers from "routers";

const TAB_ENUM = {
  ARTICLE: "article",
  MOMENT: "moment",
  COLLECTION: "collection"
};

function TabPanel(props) {
  const { children, value, tab, ...other } = props;

  return (
    <div hidden={value !== tab} {...other}>
      {value === tab && <Box sx={{ pt: 4, pb: 8 }}>{children}</Box>}
    </div>
  );
}

export default function SpaceTabs() {
  const history = useHistory();
  const { state = {} } = useLocation();
  const { tab = TAB_ENUM.ARTICLE } = state;

  const handleChange = (event, newValue) => {
    history.push(routers.USER_SPACE, { tab: newValue });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChange}>
          <Tab value={TAB_ENUM.ARTICLE} label="我的文章" />
          <Tab value={TAB_ENUM.MOMENT} label="我的动态" />
          <Tab value={TAB_ENUM.COLLECTION} label="我的收藏" />
        </Tabs>
      </Box>
      <TabPanel value={TAB_ENUM.ARTICLE} tab={tab}>
        <MyArticleList />
      </TabPanel>
      <TabPanel value={TAB_ENUM.MOMENT} tab={tab}>
        <MyMomentList />
      </TabPanel>
      <TabPanel value={TAB_ENUM.COLLECTION} tab={tab}>
        <Collection />
      </TabPanel>
    </Box>
  );
}
