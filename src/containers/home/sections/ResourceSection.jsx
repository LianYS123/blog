import { ArrowForward, ArrowRightAltRounded } from "@mui/icons-material";
import { Masonry } from "@mui/lab";
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography
} from "@mui/material";
import { HOME_SECTION_TYPES } from "constants/index";
import { useSectionListByType } from "hooks/app";
import Link from "next/link";
import routers from "routers";

export const ResourceSection = () => {
  //
  const list = useSectionListByType(HOME_SECTION_TYPES.RESOURCE);
  return (
    <Container>
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4">资源推荐</Typography>
        <Link href={routers.RESOURCE} className="flex items-center text-lg">
          <>
            <span className="mr-2">查看全部</span>
            <ArrowForward />
          </>
        </Link>
      </div>
      <Masonry columns={{ xs: 1, sm: 2 }} spacing={4}>
        {list.map((item) => {
          const {
            itemId,
            itemName,
            itemImage,
            itemDesc,
            itemDetail,
            itemLink
          } = item;
          return (
            <Card key={itemId}>
              <CardActionArea component="a" href={itemLink} target="_blank">
                <CardHeader
                  avatar={<Avatar src={itemImage} />}
                  title={itemName}
                />

                <CardContent>
                  <Typography variant="body1">{itemDesc}</Typography>
                </CardContent>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {itemDetail}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Masonry>
    </Container>
  );
};
