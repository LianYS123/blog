import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Box,
  CardActionArea,
  CardHeader,
  Chip,
  Rating
} from "@mui/material";
import { timestampFormat } from "utils";
import { useHistory } from "react-router-dom";
import { useUpSM } from "hooks";

export default function SingleRsItem(props) {
  const {
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
  } = props;

  const tagArr = tags ? tags.split("|") : [];
  const history = useHistory();

  const upSM = useUpSM();

  // 副标题
  const subheaderEl = (
    <Box display="flex">
      {/* 创建时间 */}
      <Typography variant="subtitle1" mr={1} fontSize={14} component="span">
        <Box mr={1} component="span">
          {timestampFormat(publishTime)}
        </Box>
      </Typography>
    </Box>
  );

  // 卡片头部信息
  const headerEl = (
    <CardHeader
      title={resourceName} // 文章标题
      avatar={
        // 头像
        <Avatar src={icon} aria-label="recipe" />
      }
      subheader={subheaderEl}
    />
  );

  // 摘要(简介)
  const summaryEl = (
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {desc}
      </Typography>
    </CardContent>
  );

  // 标签
  const tagsEl = (
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
  );

  // 封面图
  const coverEl = icon ? (
    <CardMedia
      sx={{
        maxWidth: { xs: "auto", sm: 256 },
        minHeight: { xs: "auto", sm: 256 }
      }}
      component="img"
      image={icon}
    />
  ) : null;

  const rateEl = (
    <CardContent className="flex items-center">
      <Rating readOnly precision={0.1} value={rate} />
      <Typography ml={1} variant="subtitle1">
        {rate}
      </Typography>
    </CardContent>
  );

  const detailEl = (
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {detail}
      </Typography>
    </CardContent>
  );

  // 手机上渲染
  const renderXs = () => {
    return (
      <>
        {headerEl}
        {coverEl}
        {summaryEl}
        {detailEl}
        {tagsEl}
        {rateEl}
      </>
    );
  };

  // 电脑上渲染
  const renderMd = () => {
    return (
      <Box display="flex" maxHeight={480}>
        <Box flex="auto">
          {headerEl}
          {summaryEl}
          {detailEl}
          {rateEl}
          {tagsEl}
        </Box>
        {coverEl}
      </Box>
    );
  };

  return (
    <Card component="div">
      <CardActionArea
        onClick={() => {
          window.open(link, "_blank");
        }}
      >
        {upSM ? renderMd() : renderXs()}
      </CardActionArea>
    </Card>
  );
}
