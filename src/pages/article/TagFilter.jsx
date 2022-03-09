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
  return (
    <Box sx={{ mb: 4 }}>
      <Box>
        <Box sx={{ mb: 2 }}>
          {Object.entries(TAGS_MAP).map(([key, tags], index) => {
            return (
              <Box key={index} mb={1} sx={{ display: "flex" }}>
                <Typography
                  color="primary.main"
                  variant="subtitle1"
                  fontWeight={700}
                  // gutterBottom
                  sx={{
                    whiteSpace: "nowrap",
                    padding: { md: "4px", width: 140 }
                  }}
                >
                  {key}:
                </Typography>
                <Box sx={{ flex: "auto" }}>
                  {tags.map((tag, index) => (
                    <Chip
                      color={selectedTags.includes(tag) ? "primary" : "default"}
                      // classes={{
                      //   label: upSM ? styles.label : "",
                      //   root: upSM ? styles.root : ""
                      // }}
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
