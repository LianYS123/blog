import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Rating,
  Typography
} from "@mui/material";
import { ActionMenuButton } from "components/action/ActionMenuButton";
import { CollectionIconButton } from "components/collection/CollectionIconButton";
import { AddToHomeButton } from "components/homeSection/AddToHomeButton";
import { COLLECTION_TYPES, HOME_SECTION_TYPES } from "constants/index";
import { noop } from "lodash";
import { timestampFormat } from "utils";

export default function ResourceItem({
  handleTagClick = noop,
  renderEditIcon = noop,
  actions = [],
  ...record
}) {
  const {
    id,
    resourceName,
    icon,
    link,
    publishTime,
    tags = "",
    desc,
    detail,
    cover,
    rateNum,
    collected,
    rate
  } = record;
  const headerEl = (
    <CardHeader
      avatar={icon ? <Avatar src={icon} aria-label="recipe" /> : null}
      title={resourceName}
      subheader={timestampFormat(publishTime || record.createTime)}
      action={
        actions.length ? (
          <ActionMenuButton
            actions={actions.map(it => ({
              ...it,
              onClick: ev => it.onClick(id)
            }))}
          />
        ) : undefined
      }
    />
  );

  // 封面图
  const coverEl = cover ? (
    <CardMedia
      sx={{
        maxHeight: 256
      }}
      component="img"
      image={cover}
    />
  ) : null;
  return (
    <Card component="div">
      {actions.length ? headerEl : null}
      <CardActionArea onClick={() => window.open(link, "_blank")}>
        {actions.length ? null : headerEl}
        {coverEl}
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
        <AddToHomeButton
          sectionType={HOME_SECTION_TYPES.RESOURCE}
          record={record}
        />
        {renderEditIcon(record)}
      </CardActions>
    </Card>
  );
}
