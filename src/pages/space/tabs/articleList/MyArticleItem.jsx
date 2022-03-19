import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography
} from "@mui/material";
import { useUpSM } from "hooks";
import { useHistory } from "react-router-dom";
import routers from "routers";
import { timestampFormat } from "utils";

/**
 * 文章卡片
 */
export const MyArticleItem = props => {
  const { cover, articleName, createTime, id, summary, tags } = props;
  const tagArr = tags ? tags.split("|") : [];
  const history = useHistory();
  const upSM = useUpSM();

  return (
    <Card>
      <CardActionArea
        onClick={() => history.push(routers.DETAIL.replace(":id", id))}
      >
        <Box display="flex" maxHeight={{ xs: "auto", md: 256 }}>
          <Box flex="auto">
            <CardHeader
              title={articleName}
              subheader={timestampFormat(createTime)}
            />
            <Box>
              <CardContent>
                <Typography variant="body1" component="div">
                  {summary}
                </Typography>
              </CardContent>
            </Box>
            {tagArr.length ? (
              <CardContent className="space-x-1">
                {tagArr.map(tag => (
                  <Chip className="cursor-pointer" key={tag} label={tag} />
                ))}
              </CardContent>
            ) : null}
          </Box>
          {cover && upSM ? (
            <CardMedia
              sx={{ width: 256 }}
              component="img"
              image={cover}
              alt={articleName}
            />
          ) : null}
        </Box>
      </CardActionArea>
    </Card>
  );
};
