import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Rating,
  Typography
} from "@mui/material";
import { CollectionIconButton } from "components/collection/CollectionIconButton";
import { COLLECTION_TYPES } from "constants/index";
import { noop } from "lodash";
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
  collected,
  rate,
  handleTagClick = noop,
  headerProps = {}
}) {
  return (
    <Card component="div">
      <CardActionArea onClick={() => window.open(link, "_blank")}>
        <CardHeader
          avatar={<Avatar src={icon} aria-label="recipe" />}
          title={resourceName}
          subheader={timestampFormat(publishTime)}
          {...headerProps}
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
      <CardActions>
        <CollectionIconButton
          collected={collected}
          type={COLLECTION_TYPES.RESOURCE}
          itemId={id}
        />
      </CardActions>
    </Card>
  );
}
