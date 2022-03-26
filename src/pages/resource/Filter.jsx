import { Chip, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { useHistoryState, useUpSM } from "hooks";
import { RESOURCE_CATEGORIES } from "./config";

const useStyles = makeStyles({
  root: {
    height: 40
  },
  label: {
    padding: "12px 24px"
  }
});

export const ResourceFilter = () => {
  const { state, setState } = useHistoryState();
  const {
    selectedTags = [],
    keyword,
    order = "view_num",
    category = "ALL",
    layout = "grid"
  } = state;
  const upSM = useUpSM();
  const styles = useStyles();

  const orders = [
    ["view_num", "热度"],
    ["publish_time", "时间"],
    ["rate", "评分"]
  ];

  const layouts = [
    ["grid", "网格"],
    ["single", "单列"],
    ["masonry", "瀑布流"]
  ];

  return (
    <Box sx={{ mb: 2 }}>
      {/* 布局 */}
      <Box mb={1}>
        {layouts.map(([cur, name]) => {
          return (
            <Chip
              color={layout === cur ? "primary" : "default"}
              classes={{
                label: upSM ? styles.label : "",
                root: upSM ? styles.root : ""
              }}
              onClick={() => setState({ layout: cur })}
              size="medium"
              sx={{ mr: 1, mb: 1 }}
              key={cur}
              label={name}
            />
          );
        })}
      </Box>

      {/* 排序 */}
      <Box mb={1}>
        {orders.map(([cur, name]) => {
          return (
            <Chip
              color={order === cur ? "primary" : "default"}
              classes={{
                label: upSM ? styles.label : "",
                root: upSM ? styles.root : ""
              }}
              onClick={() => setState({ order: cur, pageNo: 1 })}
              size="medium"
              sx={{ mr: 1, mb: 1 }}
              key={cur}
              label={name}
            />
          );
        })}
      </Box>

      {/* 分类 */}
      <Box mb={2}>
        {RESOURCE_CATEGORIES.filter(it => !!it.label).map(
          ({ category: cur, label }) => {
            return (
              <Chip
                color={category === cur ? "primary" : "default"}
                classes={{
                  label: upSM ? styles.label : "",
                  root: upSM ? styles.root : ""
                }}
                onClick={() => setState({ category: cur, pageNo: 1 })}
                size="medium"
                sx={{ mr: 1, mb: 1 }}
                key={cur}
                label={label}
              />
            );
          }
        )}
      </Box>

      {/* 关键词 */}
      {keyword ? (
        <Box>
          <Typography variant="subtitle1" sx={{ mr: 1 }} component="span">
            关键词:
          </Typography>
          <Typography variant="body1" component="span">
            {keyword}
          </Typography>

          <Link
            ml={2}
            sx={{ cursor: "pointer" }}
            onClick={() => setState({ keyword: undefined })}
          >
            重置
          </Link>
        </Box>
      ) : null}

      {/* 标签 */}
      {selectedTags.length ? (
        <Box>
          <Typography variant="subtitle1" sx={{ mr: 1 }} component="span">
            标签:
          </Typography>
          <Typography variant="body1" component="span">
            {selectedTags.join(", ")}
          </Typography>

          <Link
            ml={2}
            sx={{ cursor: "pointer" }}
            onClick={() => setState({ selectedTags: [] })}
          >
            重置
          </Link>
        </Box>
      ) : null}
    </Box>
  );
};
