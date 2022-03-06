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
  CardHeader,
  Chip,
  Tooltip,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { getQualityImage, timestampFormat } from "utils";
import routers from "routers";
import { useHistory } from "react-router-dom";
import { Lock } from "@mui/icons-material";

export default function CardArticle(props) {
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
    handleTagClick = noop
  } = props;

  const tagArr = tags ? tags.split("|") : [];
  const history = useHistory();

  const theme = useTheme();
  const upSM = useMediaQuery(theme.breakpoints.up("sm"));

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
  const coverEl = cover ? (
    <CardMedia
      sx={{ width: { xs: "auto", sm: 256 } }}
      component="img"
      image={cover}
      alt={articleName}
    />
  ) : null;

  // 手机上渲染
  const renderXs = () => {
    return (
      <>
        {headerEl}
        {coverEl}
        {summaryEl}
        {tagsEl}
      </>
    );
  };

  // 电脑上渲染
  const renderMd = () => {
    return (
      <Box display="flex" maxHeight={256}>
        <Box flex="auto">
          {headerEl}
          {summaryEl}
          {tagsEl}
        </Box>
        {coverEl}
      </Box>
    );
  };

  return (
    <Card>
      <CardActionArea
        onClick={() => history.push(routers.DETAIL.replace(":id", id))}
        component="div"
      >
        {upSM ? renderMd() : renderXs()}
      </CardActionArea>
    </Card>
  );
}
