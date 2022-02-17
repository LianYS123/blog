import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { noop } from "lodash";
import {
  Avatar,
  CardActionArea,
  CardHeader,
  Chip,
  Tooltip
} from "@mui/material";
import { timestampFormat } from "utils";
import { FILE_PREVIEW } from "services/app";
import routers from "routers";
import { useHistory } from "react-router-dom";

export default function CardArticle({
  authorAvatar,
  cover,
  summary,
  articleName,
  createTime,
  authorName,
  id,
  tags,
  handleTagClick = noop
}) {
  const tagArr = tags ? tags.split("|") : [];
  const history = useHistory();

  return (
    <Card>
      <CardActionArea
        onClick={() => history.push(routers.DETAIL.replace(":id", id))}
      >
        <CardHeader
          title={articleName}
          avatar={
            <Tooltip title={authorName}>
              <Avatar src={`${FILE_PREVIEW}?id=${authorAvatar}`} />
            </Tooltip>
          }
          subheader={timestampFormat(createTime)}
        />

        {cover ? (
          <CardMedia component="img" image={cover} alt={articleName} />
        ) : null}

        <CardContent>
          <Typography variant="body1" component="div">
            {summary}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardContent className="space-x-1 space-y-1">
        {tagArr.map(tag => (
          <Chip
            // size="small"
            className="cursor-pointer"
            onClick={() => handleTagClick(tag)}
            key={tag}
            label={tag}
          />
        ))}
      </CardContent>
    </Card>
  );
}
