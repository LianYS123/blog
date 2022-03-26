import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  Rating,
  Typography
} from "@mui/material";
import { timestampFormat } from "utils";

export default function ResourceItem({
  id,
  resourceName,
  icon,
  link,
  publishTime,
  tags = "",
  desc,
  detail,
  rateNum,
  rate,
  handleTagClick
}) {
  return (
    <Card component="div">
      <CardActionArea onClick={() => window.open(link, "_blank")}>
        <CardHeader
          avatar={<Avatar src={icon} aria-label="recipe" />}
          title={resourceName}
          subheader={timestampFormat(publishTime)}
        />

        {/* <CardMedia component="img" src={icon} /> */}

        <CardContent>
          <Typography variant="body1">{desc}</Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {detail}
          </Typography>
        </CardContent>
        <CardContent className="flex items-center">
          <Rating readOnly precision={0.1} value={rate} />
          <Typography ml={1} variant="subtitle1">
            {rate}
          </Typography>
        </CardContent>
        <CardContent>
          <div style={{ marginBottom: 8 }}>
            {tags && tags.length
              ? tags.split("|").map(tag => (
                  <Chip
                    onClick={ev => {
                      ev.stopPropagation();
                      handleTagClick(tag);
                    }}
                    style={{ margin: 4 }}
                    variant="outlined"
                    key={tag}
                    label={tag}
                  />
                ))
              : null}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
