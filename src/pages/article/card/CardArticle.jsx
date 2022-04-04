import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { noop } from "lodash";
import {
  Avatar,
  Box,
  CardActionArea,
  CardActions,
  CardHeader,
  Chip,
  Tooltip
} from "@mui/material";
import { getQualityImage, timestampFormat } from "utils";
import routers from "routers";
import { useHistory } from "react-router-dom";
import { Lock } from "@mui/icons-material";
import { useUpSM } from "hooks";
import { CollectionIconButton } from "components/collection/CollectionIconButton";
import { COLLECTION_TYPES, HOME_SECTION_TYPES } from "constants/index";
import { AddToHomeButton } from "components/homeSection/AddToHomeButton";

export default function CardArticle({ handleTagClick = noop, ...record }) {
  const {
    authorAvatar,
    cover,
    summary,
    articleName,
    createTime,
    authorName,
    id,
    tags,
    visibleStatus,
    collected
  } = record;

  const tagArr = tags ? tags.split("|") : [];
  const history = useHistory();

  const upSM = useUpSM();

  // 副标题
  const subheaderEl = (
    <Box display="flex">
      {/* 创建时间 */}
      <Typography
        variant="subtitle1"
        color={theme => theme.palette.text.secondary}
        mr={1}
        fontSize={14}
        component="span"
      >
        <Box mr={1} component="span">
          {timestampFormat(createTime)}
        </Box>

        {/* 是否仅自己可见 */}
        <Box component="span">
          {visibleStatus === 1 && (
            <Tooltip title="仅自己可见">
              <Lock sx={{ fontSize: 14 }} />
            </Tooltip>
          )}
        </Box>
      </Typography>
    </Box>
  );

  // 卡片头部信息
  const headerEl = (
    <CardHeader
      title={articleName} // 文章标题
      avatar={
        // 头像
        authorName ? (
          <Tooltip title={authorName}>
            <Avatar src={getQualityImage(authorAvatar)} />
          </Tooltip>
        ) : null
      }
      subheader={subheaderEl}
    />
  );

  // 摘要(简介)
  const summaryEl = (
    <CardContent>
      <Typography variant="body1" component="div">
        {summary}
      </Typography>
    </CardContent>
  );

  // 标签
  const tagsEl = tagArr.map(tag => (
    <Chip
      className="cursor-pointer mr-2"
      onClick={ev => {
        ev.stopPropagation();
        handleTagClick(tag);
      }}
      key={tag}
      label={tag}
    />
  ));

  // 封面图
  const coverEl = cover ? (
    <CardMedia
      sx={{
        width: { xs: "auto", sm: 256 }
      }}
      component="img"
      image={cover}
      alt={articleName}
    />
  ) : null;

  const cardActionsEl = (
    <CardActions className="flex">
      <div className="mr-2">
        <CollectionIconButton
          collected={collected}
          type={COLLECTION_TYPES.ARTICLE}
          itemId={record.id}
        />
        <AddToHomeButton
          sectionType={HOME_SECTION_TYPES.ARTICLE}
          record={record}
        />
      </div>
      {tagsEl}
    </CardActions>
  );

  // 手机上渲染
  const renderXs = () => {
    return (
      <CardActionArea
        onClick={() => history.push(routers.DETAIL.replace(":id", id))}
      >
        {headerEl}
        {coverEl}
        {summaryEl}
        {cardActionsEl}
      </CardActionArea>
    );
  };

  // 电脑上渲染
  const renderMd = () => {
    return (
      <div className="flex items-stretch">
        <div className="flex-auto flex flex-col justify-between">
          <CardActionArea
            className="flex-auto"
            sx={{
              pb: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start"
            }}
            onClick={() => history.push(routers.DETAIL.replace(":id", id))}
          >
            {headerEl}
            {summaryEl}
          </CardActionArea>
          {cardActionsEl}
        </div>
        {coverEl}
      </div>
    );
  };

  return <Card>{upSM ? renderMd() : renderXs()}</Card>;
}
