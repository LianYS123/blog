import { Chip, Grid, Link, Typography, useMediaQuery } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { ALL_TAGS, TAGS_MAP } from "constants/index";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useHistoryState } from "hooks";

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
  const theme = useTheme();
  const upSM = useMediaQuery(theme.breakpoints.up("sm"));
  const unextendTags = upSM ? ALL_TAGS.slice(0, 20) : ALL_TAGS.slice(0, 13);
  const [showTags, setShowTags] = useState(unextendTags);
  const [extend, setExtend] = useState(false);
  const styles = useStyles();
  useEffect(() => {
    if (!extend) {
      setShowTags(unextendTags);
    }
  }, [upSM]);
  const toggleExtend = () => {
    if (extend) {
      setShowTags(unextendTags);
    } else {
      setShowTags(ALL_TAGS);
    }
    setExtend(!extend);
  };
  return (
    <Box sx={{ mb: 4 }}>
      <Box>
        {/* <Typography variant="h6" sx={{ mb: 2, fontSize: 18 }}>
          通过标签快速搜索
        </Typography> */}
        <Box sx={{ mb: 2 }}>
          <Box mb={1}>
            {Object.entries(TAGS_MAP).map(([key, tags], index) => {
              return (
                <Box display="flex" key={index}>
                  <Box sx={{ width: 140, textAlign: "right", mr: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ whiteSpace: "nowrap", padding: { md: "4px" } }}
                    >
                      {key}:
                    </Typography>
                  </Box>
                  <Box>
                    {tags.map((tag, index) => (
                      <Chip
                        color={
                          selectedTags.includes(tag) ? "primary" : "default"
                        }
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
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
      {selectedTags.length ? (
        <Box>
          <Typography variant="subtitle1" sx={{ mr: 1 }} component="span">
            Selected:
          </Typography>
          <Typography variant="body1" component="span">
            {selectedTags.join(", ")}
          </Typography>

          <Link
            ml={2}
            sx={{ cursor: "pointer" }}
            onClick={() => setState({ selectedTags: [] })}
          >
            Reset
          </Link>
        </Box>
      ) : null}
    </Box>
  );
};
