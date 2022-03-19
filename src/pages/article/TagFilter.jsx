import { Chip, Link, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { TAGS_MAP } from "constants/index";
import { makeStyles } from "@mui/styles";
import { useHistoryState, useUpSM } from "hooks";
import { useState } from "react";

const useStyles = makeStyles({
  root: {
    height: 40
  },
  label: {
    padding: "12px 24px"
  }
});

export const TagFilter = ({ handleTagClick }) => {
  const { state, setState } = useHistoryState();
  const { selectedTags = [], keyword } = state;
  const [extend, setExtend] = useState(false);
  const upSM = useUpSM();
  const styles = useStyles();

  const toggleExtend = () => {
    setExtend(!extend);
  };

  const showItems = Object.entries(TAGS_MAP).filter(
    (_, index) => index < (extend ? 999 : 2)
  );

  return (
    <Box sx={{ mb: 4 }}>
      <Stack spacing={1}>
        {showItems.map(([key, tags], index) => {
          return (
            <Box key={key}>
              {tags.map((tag, index) => (
                <Chip
                  color={selectedTags.includes(tag) ? "primary" : "default"}
                  classes={{
                    label: upSM ? styles.label : "",
                    root: upSM ? styles.root : ""
                  }}
                  onClick={() => handleTagClick(tag)}
                  size="medium"
                  sx={{ mr: 1, mb: 1 }}
                  key={tag}
                  label={tag}
                />
              ))}

              {/* 展开收起 */}
              {index === showItems.length - 1 ? (
                <Chip
                  classes={{
                    label: upSM ? styles.label : "",
                    root: upSM ? styles.root : ""
                  }}
                  onClick={toggleExtend}
                  variant="outlined"
                  size="medium"
                  sx={{ mr: 1, mb: 1 }}
                  label={extend ? "收起" : "更多..."}
                />
              ) : null}
            </Box>
          );
        })}
      </Stack>
      {selectedTags.length ? (
        <Box>
          <Typography variant="subtitle1" sx={{ mr: 1 }} component="span">
            搜索标签:
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
