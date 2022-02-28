// import { Empty as SemiEmpty } from "@douyinfe/semi-ui";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useRefresh } from "hooks";
import emptyImgSrc from "./empty.svg";

/**
 * 空数据状态组件，默认刷新逻辑为重新挂载当前路由
 */
export const Empty = ({ reload = true }) => {
  const refresh = useRefresh();
  return (
    <Box width="100%" display="flex" flexDirection="column" alignItems="center">
      <img src={emptyImgSrc} style={{ width: 416 }} />
      <Button
        size="large"
        onClick={() => {
          if (reload === true) {
            refresh();
          } else if (typeof reload === "function") {
            reload();
          }
        }}
      >
        点我刷新
      </Button>
    </Box>
  );
};
