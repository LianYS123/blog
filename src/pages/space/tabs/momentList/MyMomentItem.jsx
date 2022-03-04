import { Lock } from "@mui/icons-material";
import { Card, CardContent, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { timestampFormat } from "utils";

export const MyMomentItem = props => {
  const { createTime, html, id, visibleStatus } = props;
  return (
    <Card>
      <CardContent>
        <article
          id="htmlTemplate"
          dangerouslySetInnerHTML={{ __html: html }}
        ></article>
        <Box display="flex" alignItems="center">
          <Typography
            variant="subtitle1"
            color={theme => theme.palette.text.secondary}
            mr={1}
            component="span"
          >
            {timestampFormat(createTime)}
          </Typography>
          {visibleStatus === 1 && (
            <Tooltip title="仅自己可见">
              <Typography
                color={theme => theme.palette.text.secondary}
                variant="subtitle1"
                mr={1}
                component="span"
              >
                <Lock sx={{ fontSize: 16 }} />
              </Typography>
            </Tooltip>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
