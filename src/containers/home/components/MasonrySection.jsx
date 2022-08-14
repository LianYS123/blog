import { ArrowForward } from "@mui/icons-material";
import { Masonry } from "@mui/lab";
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Container,
  Typography
} from "@mui/material";
import Link from "next/link";
import { getItemActionProps } from "../utils";

export const MasonrySection = ({ title, list, toMore, to, onItemClick }) => {
  return (
    <Container>
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4">{title}</Typography>
        <Link href={toMore} className="flex items-center text-lg">
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
              <CardActionArea
                {...getItemActionProps({ item, to, onItemClick })}
              >
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
