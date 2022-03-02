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
import { getQualityImage, timestampFormat } from "utils";
import routers from "routers";
import { useHistory } from "react-router-dom";

export default function MobileArticle({
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
              <Avatar src={getQualityImage(authorAvatar)} />
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
        <CardContent className="space-x-1">
          {tagArr.map(tag => (
            <Chip
              // size="small"
              className="cursor-pointer"
              onClick={ev => {
                // ev.preventDefault();
                ev.stopPropagation();
                handleTagClick(tag);
              }}
              key={tag}
              label={tag}
            />
          ))}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}