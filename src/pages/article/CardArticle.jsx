import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { noop } from "lodash";
import { Avatar, CardActions, CardHeader, Chip, Collapse } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { timestampFormat } from "utils";
import { FILE_PREVIEW } from "services/app";
import routers from "routers";
import { useHistory } from "react-router-dom";

const ExpandMore = styled(props => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));

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
  const [expanded, setExpanded] = React.useState(false);
  const history = useHistory();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card onClick={() => history.push(routers.DETAIL.replace(":id", id))}>
      <CardHeader
        title={articleName}
        avatar={<Avatar src={`${FILE_PREVIEW}?id=${authorAvatar}`} />}
        subheader={
          <div className="space-x-2">
            <span>{authorName}</span>
            <span>{timestampFormat(createTime)}</span>
          </div>
        }
      />

      {cover ? (
        <CardMedia component="img" image={cover} alt={articleName} />
      ) : null}
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography variant="body2" color="text.secondary" component="div">
          {summary}
        </Typography>
      </CardContent>
      <CardActions onClick={ev => ev.stopPropagation()} disableSpacing>
        <IconButton>
          <Favorite />
        </IconButton>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <ExpandMore expand={expanded} onClick={handleExpandClick}>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse
        onClick={ev => ev.stopPropagation()}
        in={expanded}
        timeout="auto"
      >
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
      </Collapse>
    </Card>
  );
}
