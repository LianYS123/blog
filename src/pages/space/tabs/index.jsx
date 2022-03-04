import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { MyArticleList } from "./articleList";
import { MyMomentList } from "./momentList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ pt: 4, pb: 8 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function SpaceTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="我的文章" />
          <Tab label="我的动态" />
          <Tab label="收藏" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <MyArticleList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MyMomentList />
      </TabPanel>
      <TabPanel value={value} index={2}>
        收藏
      </TabPanel>
    </Box>
  );
}
