import { Chip, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { useHistoryState, useUpSM } from "hooks";

const useStyles = makeStyles({
  root: {
    height: 40
  },
  label: {
    padding: "12px 24px"
  }
});

export const BookFilter = () => {
  const { state, setState } = useHistoryState();
  const {
    selectedTags = [],
    keyword,
    order = "rating_count",
    category = "ALL"
  } = state;
  const upSM = useUpSM();
  const styles = useStyles();

  const orders = [
    ["rating_count", "热度"],
    ["publish_time", "时间"],
    ["rating_score", "评分"]
  ];

  return (
    <Box sx={{ mb: 2 }}>
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
        {["ALL", "文学", "科技", "生活", "文化", "流行", "经管"].map(cur => {
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
              label={cur === "ALL" ? "全部" : cur}
            />
          );
        })}
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
