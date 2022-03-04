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
  Typography,
  useMediaQuery,
  useTheme
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
  const theme = useTheme();
  const upSM = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Card>
      <CardActionArea
        onClick={() => history.push(routers.DETAIL.replace(":id", id))}
      >
        <Box display="flex" maxHeight={{ xs: "auto", md: 256 }}>
          <Box flex="auto">
            <CardHeader
              title={articleName}
              subheader={timestampFormat(createTime)}
            />
            <Box>
              <CardContent>
                <Typography variant="body1" component="div">
                  {summary}
                </Typography>
              </CardContent>
            </Box>
            {tagArr.length ? (
              <CardContent className="space-x-1">
                {tagArr.map(tag => (
                  <Chip className="cursor-pointer" key={tag} label={tag} />
                ))}
              </CardContent>
            ) : null}
          </Box>
          {cover && upSM ? (
            <CardMedia
              sx={{ width: 256 }}
              component="img"
              image={cover}
              alt={articleName}
            />
          ) : null}
        </Box>
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
            <MyArticle key={it.id} {...it} />
          ))}
        </Stack>
      ) : loading ? null : (
        <Empty reload={reload} />
      )}

      <SkeletonList loading={loadingMore} />
    </Box>
  );
};
