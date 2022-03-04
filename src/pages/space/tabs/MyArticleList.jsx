import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  Stack,
  Typography
} from "@mui/material";
import { Empty } from "components/empty";
import { SkeletonList } from "components/skeleton";
import { useFetchList } from "hooks";
import { useHistory } from "react-router-dom";
import routers from "routers";
import { SPACE_ARTICLE_LIST } from "services/space";
import { timestampFormat } from "utils";

const MyArticle = props => {
  const { cover, articleName, createTime, id, summary, tags } = props;
  const tagArr = tags ? tags.split("|") : [];
  const history = useHistory();
  return (
    <Card>
      <CardActionArea
        onClick={() => history.push(routers.DETAIL.replace(":id", id))}
      >
        <CardHeader
          title={articleName}
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
              key={tag}
              label={tag}
            />
          ))}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export const MyArticleList = () => {
  const {
    list = [],
    loadingFirstPage,
    loadingMore,
    loading,
    search,
    reload
  } = useFetchList({
    service: SPACE_ARTICLE_LIST
  });
  return (
    <Box>
      <SkeletonList loading={loadingFirstPage} />
      {list.length ? (
        <Stack spacing={2}>
          {list.map(it => (
            <MyArticle {...it} />
          ))}
        </Stack>
      ) : loading ? null : (
        <Empty reload={reload} />
      )}

      <SkeletonList loading={loadingMore} />
    </Box>
  );
};
